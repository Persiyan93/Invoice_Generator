using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Data.Models;
using AutoMapper;

namespace InvoiceGenerator.Web.Models.Address
{
    public class AddressViewModel : AddressModel, IMapFrom<InvoiceGenerator.Data.Models.Address>, IHaveCustomMappings
    {
        public string Id { get; set; }
       

     
        
        public void CreateMappings(IProfileExpression configuration)
        {
          
            configuration.CreateMap<InvoiceGenerator.Data.Models.Address, AddressViewModel>()
                 .ForMember(x => x.Country, opt =>
                        opt.MapFrom(y => y.Town.Country.Name))
                .ForMember(x => x.Town, opt =>
                     opt.MapFrom(a => a.Town.Name));

           
              
        }
    }
   
}
 