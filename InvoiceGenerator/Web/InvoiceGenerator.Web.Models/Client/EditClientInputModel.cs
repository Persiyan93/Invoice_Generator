using InvoiceGenerator.Data.Models.Enum;


namespace InvoiceGenerator.Web.Models.Client
{
   public  class EditClientInputModel
    {
        public string Name { get; set; }

        public TypeOfCompany CompanyType { get; set; }

        public string  AccontablePersonName { get; set; }
    }
}
