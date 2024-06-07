﻿using Microsoft.Extensions.Configuration;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using Tweet_service.model.Execeptions;

namespace Tweet_service.message_broker
{
    public class MessageBroker : IDisposable
    {
        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly string replyQueueName;
        private readonly ConcurrentDictionary<string, TaskCompletionSource<string>> callbackMapper = new();

        public MessageBroker(IConfiguration configuration)
        {
            try
            {
                var factory = new ConnectionFactory { HostName = configuration["Broker:host"] };

                connection = factory.CreateConnection();
                channel = connection.CreateModel();
                // declare a server-named queue
                replyQueueName = channel.QueueDeclare().QueueName;
                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    if (!callbackMapper.TryRemove(ea.BasicProperties.CorrelationId, out var tcs))
                        return;
                    var body = ea.Body.ToArray();
                    var response = Encoding.UTF8.GetString(body);
                    tcs.TrySetResult(response);
                };

                channel.BasicConsume(consumer: consumer,
                                     queue: replyQueueName,
                                     autoAck: true);
            }
            catch (Exception)
            {
                throw new BrokerException("Broker is down");
            }
        }

        public async Task<string> CallAsync(BrokerMessage message, CancellationToken cancellationToken = default)
        {
            IBasicProperties props = channel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;
            props.ReplyTo = replyQueueName;

            var tcs = new TaskCompletionSource<string>();
            callbackMapper.TryAdd(correlationId, tcs);

            Task timeoutTask = Task.Delay(TimeSpan.FromSeconds(5));

            switch (message.ToService)
            {
                case "account_service":
                    var messageBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
                    channel.BasicPublish(exchange: string.Empty,
                             routingKey: "account_service-queue",
                             basicProperties: props,
                             body: messageBytes);
                    break;
            }
            await Task.WhenAny(tcs.Task, timeoutTask);

            if (!tcs.Task.IsCompleted)
            {
                throw new TimeoutException("Sending message timed out.");
            }

            // Remove the callback mapping
            callbackMapper.TryRemove(correlationId, out _);

            return await tcs.Task;
        }


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                connection?.Dispose();
                channel?.Dispose();
            }
        }
    }
}
