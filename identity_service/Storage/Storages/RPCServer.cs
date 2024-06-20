using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using Microsoft.Extensions.Hosting;
using Models.Services_Interfaces;
using Newtonsoft.Json;
using Models.Identities;
using Models.Broker;
using Models.Exceptions;


namespace Storage.Storages
{
    public class RPCServer : IHostedService
    {
        private readonly ConnectionFactory _factory;
        private IConnection _connection;
        private readonly IModel _channel;
        private readonly string _queueName;
        private readonly IServiceScope scope;

        public RPCServer(IServiceProvider serviceProvider)
        {
            scope = serviceProvider.CreateScope();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
            _factory = new ConnectionFactory() { HostName = configuration["Broker:host"] };
            CreateConnection();
            _channel = _connection.CreateModel();
            _queueName = "account_service-queue";

        }

        private void CreateConnection()
        {
            int retries = 0;
            int maxRetries = 5;
            TimeSpan delay = TimeSpan.FromSeconds(10);
            while (retries < maxRetries)
            {
                try
                {
                    _connection = _factory.CreateConnection();
                    break;
                }
                catch (Exception)
                {
                    retries++;
                    Task.Delay(delay).Wait();
                    Console.WriteLine($" [.] Retry {retries} of {maxRetries}");
                }
            }

            if (retries == maxRetries)
            {
                throw new BrokerException("Retry count exceeded");
            }
        }

        public async Task StartListening()
        {
            _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            var consumer = new EventingBasicConsumer(_channel);
            _channel.BasicConsume(queue: _queueName, autoAck: false, consumer: consumer);

            Console.WriteLine($" [x] Awaiting RPC requests on {_queueName}");

            consumer.Received += async (model, ea) =>
            {
                var identityService = scope.ServiceProvider.GetRequiredService<IIdentityService>();
                string response = string.Empty;

                var body = ea.Body.ToArray();
                var props = ea.BasicProperties;
                var replyProps = _channel.CreateBasicProperties();

                replyProps.CorrelationId = props.CorrelationId;

                try
                {
                    var message = Encoding.UTF8.GetString(body);
                    BrokerMessage brokerMessage = JsonConvert.DeserializeObject<BrokerMessage>(message);

                    Console.WriteLine($" [.] Action: {brokerMessage.Action} has been requested");

                    switch (brokerMessage.Action)
                    {

                        case "get_user":
                            var getUserBrokerRequest = JsonConvert.DeserializeObject<GetUserBrokerRequest>(JsonConvert.SerializeObject(brokerMessage.Load));

                            Identity identity = identityService.GetIdentity(getUserBrokerRequest.Email);
                            if(identity == null)
                            {
                                response = JsonConvert.SerializeObject(identity);
                                return;
                            }
                            GetUserBrokerResponse getUserBrokerResponse = new GetUserBrokerResponse()
                            {
                                Email = identity.Email,
                                Birthdate = identity.Birthdate,
                            };

                            response = JsonConvert.SerializeObject(getUserBrokerResponse);
                            break;
                        case "update_identity":
                            var updateIdentityBrokerRequest = JsonConvert.DeserializeObject<UpdateIdentityBrokerRequest>(JsonConvert.SerializeObject(brokerMessage.Load));
                            Identity updateIdentity = identityService.GetIdentity(updateIdentityBrokerRequest.Email);
                            updateIdentity.Birthdate = updateIdentityBrokerRequest.Birthdate;
                            updateIdentity = identityService.Update(updateIdentity);
                            break;
                        default: break;
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($" [.] {e.Message}");
                    response = string.Empty;
                }
                finally
                {
                    var responseBytes = Encoding.UTF8.GetBytes(response);
                    _channel.BasicPublish(exchange: string.Empty,
                                         routingKey: props.ReplyTo,
                                         basicProperties: replyProps,
                                         body: responseBytes);
                    _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                }
            };
        }

        public void Close()
        {
            _connection.Close();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await StartListening();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Close();
            return Task.CompletedTask;
        }
    }
}
