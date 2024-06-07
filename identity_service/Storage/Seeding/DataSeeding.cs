using Models.Identities;

namespace Storage.Seeding
{
    public class DataSeeding
    {
        public List<Identity> GetIdentitys()
        {
            return new List<Identity>()
            {
                new Identity() {
                Id = 1,
                Email= "admin@gmail.com",
                HashedPassword= "Bn1B6kZXv3Y5wCpGFotvNV9KC1dYs5KQ1svC4+tETOU=",
                Salt= "RBJRuIqqOmD+hxI4eSl+Rg==",
                Role = "Admin",
                Birthdate = new DateOnly(2001,01,01),
                RegisterMethod = "DataSeeding",
                UserLoginAttempt= new Models.Auth.UserLoginAttempt(){
                UserId=1,
                AttemptsCount=0,
                }
            },
                {
                    new Identity() {
                Id = 2,
                Email= "moderator@gmail.com",
                HashedPassword= "Bn1B6kZXv3Y5wCpGFotvNV9KC1dYs5KQ1svC4+tETOU=",
                Salt= "RBJRuIqqOmD+hxI4eSl+Rg==",
                Role = "Moderator",
                Birthdate = new DateOnly(2001,01,01),
                RegisterMethod = "DataSeeding",
                UserLoginAttempt= new Models.Auth.UserLoginAttempt(){
                UserId=2,
                AttemptsCount=0,
                }
            } }
                ,
                {
                    new Identity() {
                Id = 3,
                Email= "test@gmail.com",
                HashedPassword= "Bn1B6kZXv3Y5wCpGFotvNV9KC1dYs5KQ1svC4+tETOU=",
                Salt= "RBJRuIqqOmD+hxI4eSl+Rg==",
                Role = "User",
                Birthdate = new DateOnly(2001,01,01),
                RegisterMethod = "DataSeeding",
                UserLoginAttempt= new Models.Auth.UserLoginAttempt(){
                UserId=3,
                AttemptsCount=0,
                }
            } }
            };
        }
    }
}
