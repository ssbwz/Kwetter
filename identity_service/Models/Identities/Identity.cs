﻿using Models.Auth;
using System.ComponentModel.DataAnnotations;

namespace Models.Identities
{
    public class Identity
    {
 
        public int Id { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public string RegisterMethod { get; set; }
        public string Role { get; set; }
        public DateOnly Birthdate { get; set; }
        public UserLoginAttempt UserLoginAttempt { get; set; }
    }
}
