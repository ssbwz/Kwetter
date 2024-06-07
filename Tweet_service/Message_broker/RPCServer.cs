using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using System.Threading.Channels;
using Tweet_service.model.Repositories;

namespace Tweet_service.message_broker
{
    public class RPCServer : BackgroundService
    {
        private IConnection _connection;
        private IModel _channel;
        private readonly string delete_publisher_queue;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly IConfiguration _configuration;
        private readonly ConnectionFactory factory;
        private readonly string replyQueueName;

        private readonly ConcurrentDictionary<string, TaskCompletionSource<string>> callbackMapper = new();

        public RPCServer(IServiceProvider serviceProvider)
        {
            _serviceScopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();
            _configuration = serviceProvider.GetRequiredService<IConfiguration>();
            factory = new ConnectionFactory() { HostName = _configuration["Broker:host"] };
            connect();
            _channel = _connection.CreateModel();


            // declare a server-named queue
            delete_publisher_queue = _configuration["Broker:delete-publisher-queue"];
            replyQueueName = _channel.QueueDeclare().QueueName;
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                if (!callbackMapper.TryRemove(ea.BasicProperties.CorrelationId, out var tcs))
                    return;
                var body = ea.Body.ToArray();
                var response = Encoding.UTF8.GetString(body);
                tcs.TrySetResult(response);
            };

            _channel.BasicConsume(consumer: consumer,
                                 queue: replyQueueName,
                                 autoAck: true);
        }


        private void connect()
        {
            int retries = 0;
            int maxRetries = 5;
            TimeSpan delay = TimeSpan.FromSeconds(0);

            while (retries < maxRetries)
            {
                try
                {
                    _connection = factory.CreateConnection();
                    break;
                }
                catch (Exception)
                {
                    delay = TimeSpan.FromSeconds(35);
                    retries++;
                    Task.Delay(delay).Wait();
                    Console.WriteLine($" [.] Retry {retries} of {maxRetries}");
                }
            }

            if (retries == maxRetries)
            {
                throw new Exception("Retry count exceeded");
            }
        }


        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            _channel.QueueDeclare(queue: delete_publisher_queue, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            var consumer1 = new EventingBasicConsumer(_channel);
            consumer1.Received += async (model, ea) =>
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var profileRepository = scope.ServiceProvider.GetRequiredService<ITweetRepository>();

                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);

                    profileRepository.DeletePublisher(message);
                    Console.WriteLine($"Publisher with email: {message} got deteleted");
                }
            };


            _channel.BasicConsume(queue: delete_publisher_queue, autoAck: true, consumer: consumer1);

            return Task.CompletedTask;
        }

        public async Task<string> CallAsync(BrokerMessage message, CancellationToken cancellationToken = default)
        {
            IBasicProperties props = _channel.CreateBasicProperties();
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
                    _channel.BasicPublish(exchange: string.Empty,
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

        public override void Dispose()
        {
            _channel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}
