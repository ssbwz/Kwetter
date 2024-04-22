using AutoMapper;
using Models.Identities;

namespace Models.Mappers
{
    public class IdentityMapper : Profile
    {
        public IdentityMapper()
        {
            CreateWorkflowMapper();
        }

        private void CreateWorkflowMapper()
        {
            CreateMap<Identity, GetIdentityDTO>();
        }
    }
}
