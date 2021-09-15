using InvoiceGenerator.Web.Models.AccessAreas;
using System.ComponentModel.DataAnnotations;


namespace InvoiceGenerator.Web.Models.Users
{
    public class UserModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public UserAccessModel AccessAreas  { get; set; }
    }
}
