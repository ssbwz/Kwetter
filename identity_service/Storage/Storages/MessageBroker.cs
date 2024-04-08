using Microsoft.Extensions.Configuration;
using Models.Storage_Interfaces;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace Storage.Storages
{
    public class MessageBroker(IConfiguration configuration) : IMessageBroker
    {

        public void SendMessage(string email, string queueName)
        {
            var factory = new ConnectionFactory() { HostName = configuration["Broker:host"] };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: queueName,
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);
                var message = Encoding.UTF8.GetBytes(email);

                // Publish the message to the queue
                channel.BasicPublish(exchange: "",
                    mandatory: true,
                                     routingKey: queueName,
                                     basicProperties: null,
                                     body: message);
                Console.WriteLine("Sent:" + message);
            }
        }
    }
}
