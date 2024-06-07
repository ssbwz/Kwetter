namespace Tweet_service.message_broker
{
    public class BrokerMessage
    {
        public string ToService { get; }

        public object Load { get; }

        public string Action { get; }

        public BrokerMessage(string toService, object load, string action)
        {
            this.ToService = toService;
            this.Load = load;
            this.Action = action;
        }
    }
}
