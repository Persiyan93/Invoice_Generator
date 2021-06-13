using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Data.Models;

namespace InvoiceGenerator.Web.Models.Address
{
    public class AddressViewModel : IMapFrom<InvoiceGenerator.Data.Models.Address>,IAddress
    {
        public string Id { get; set; }

        public string AddressText { get ; set; }

        public string TownName { get ; set ; }

        public string CountryName { get ; set ; }
    }
}
