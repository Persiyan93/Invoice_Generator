using InvoiceGenerator.Services.Mapping;


namespace InvoiceGenerator.Web.Models.ContactPerson
{
    public class ContactPersonViewModel:IMapFrom<InvoiceGenerator.Data.Models.ContactPerson>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string  Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
