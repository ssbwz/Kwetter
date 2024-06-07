using System.ComponentModel.DataAnnotations;

namespace Tweet_service.model.Entities
{
    public class Tweet
    {
        public int Id { get; set; }
        public string PublisherEmail { get; set; }

        [MaxLength(150)]
        public string TextContent { get; set; }

        public bool IsEighteenPlus { get; set; }
    }
}
