using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using profile_service.model.Models;
using profile_service.model.Repositories;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace profile_service.storage.Repositories
{
    public class MessageBroker : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string create_profile_queue;
        private readonly string delete_profile_queue;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public MessageBroker(IServiceProvider serviceProvider)
        {
            _serviceScopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            var factory = new ConnectionFactory() { HostName = configuration["Broker:host"] };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            create_profile_queue = "profile-creation-queue";
            delete_profile_queue = "profile-delation-queue";
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            _channel.QueueDeclare(queue: create_profile_queue, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.QueueDeclare(queue: delete_profile_queue, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            var consumer1 = new EventingBasicConsumer(_channel);
            consumer1.Received += async (model, ea) =>
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var profileRepository = scope.ServiceProvider.GetRequiredService<IProfileRepository>();

                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var defaultProfile = new Profile()
                    {
                        Name = "",
                        Email = message,
                        Bio = "",
                        ProfileImage = []
                    };

                    Profile newProfile = profileRepository.CreateProfile(defaultProfile);
                    Console.WriteLine($"New profile id (Queue 1): {newProfile.Id}");
                }
            };

            var consumer2 = new EventingBasicConsumer(_channel);
            consumer2.Received += async (model, ea) =>
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var profileRepository = scope.ServiceProvider.GetRequiredService<IProfileRepository>();

                    var body = ea.Body.ToArray();
                    var email = Encoding.UTF8.GetString(body);
                    Profile profile = profileRepository.GetProfileByEmail(email);
                    if(profile == null)
                    {
                        Console.WriteLine($"profile with email: {email} can not be found.");
                        return;
                    }
                    profileRepository.DeleteProfile(profile);
                    Console.WriteLine($"profile with email: {email}");
                }
            };

            _channel.BasicConsume(queue: create_profile_queue, autoAck: true, consumer: consumer1);
            _channel.BasicConsume(queue: delete_profile_queue, autoAck: true, consumer: consumer2);

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
