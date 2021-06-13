

namespace InvoiceGenerator.Common
{
    public static class ErrorMessages
    {
        public const string UserAlreadyExist = "{0} email address already exist!";
        public const string CompanyAlreadyExist = "Company with such VAT number already exists!";
        public const string CompanyWithSuchIdDoesNotExist = "Compani with Id:{0} does not exist! ";
        public const string IncorectData = "Incorect Data! Check your arguments!";
        public const string UserWithSuchIdDoesNotExist = "User with Id:{0} does not exist!";
        public const string UserExistInAnotherCompany = "User already participate in another company!";
        public const string ClientAlreadyExist = "Client with Vat number:{0} already Exist!";
        public const string ClientDoesNotExist = "Client with Id does not exist!";


    }
}
