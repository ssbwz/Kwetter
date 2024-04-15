using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using Tweet_service.model.Repositories;

namespace Tweet_service.message_broker
{
    public class MessageBroker : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string delete_publisher_queue;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public MessageBroker(IServiceProvider serviceProvider)
        {
            _serviceScopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            var factory = new ConnectionFactory() { HostName = configuration["Broker:host"] };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            delete_publisher_queue = configuration["Broker:delete-publisher-queue"];
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

        public override void Dispose()
        {
            _channel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}
