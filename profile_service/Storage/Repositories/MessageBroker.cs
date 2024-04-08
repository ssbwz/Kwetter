using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using profile_service.model.Models;
using profile_service.model.Repositories;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace profile_service.storage.Repositories
{
    public class MessageBroker : BackgroundService
    {

        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string _queueName;
        private readonly IProfileRepository profileRepository;
        private IServiceProvider serviceProvider;
        private readonly IServiceScope scope;

        public MessageBroker(IServiceProvider service)
        {
            this.serviceProvider = service;
            scope = serviceProvider.CreateScope();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

            var factory = new ConnectionFactory() { HostName = configuration["Broker:host"] };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _queueName = "profile-creation-queue";
        }


        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);



            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var profileRepository = scope.ServiceProvider.GetRequiredService<IProfileRepository>();

                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                // Handle the received message here
                var DefaultProfile = new Profile()
                {
                    Name = "",
                    Email = message,
                    Bio = "",
                    ProfileImage = []
                };

                Profile newProfile = profileRepository.CreateProfile(DefaultProfile);
                // Handle the received message here
                Console.WriteLine($"New profile id: {newProfile.Id}");
            };

            _channel.BasicConsume(queue: _queueName, autoAck: true, consumer: consumer);

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
