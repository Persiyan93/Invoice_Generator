

namespace InvoiceGenerator.Common
{
    public static class ErrorMessages
    {
        public const string UserNotLoggedIn = "The user is not logged in";
        public const string UserAlreadyExist = "{0} email address already exist!";
        public const string UserwithUsernameAlreadyExist = "{0} username already exist!";
        public const string CompanyAlreadyExist = "Company with  VAT number: {0} already exists!";
        public const string CompanyWithSuchIdDoesNotExist = "Compani with Id:{0} does not exist! ";
        public const string PersonWithSuchEmailAlreadyExist = "Person with email:{0} already exist!";
        public const string IncorectData = "Incorect Data! Check your arguments!";
        public const string UserWithSuchIdDoesNotExist = "User with Id:{0} does not exist!";
        public const string UserExistInAnotherCompany = "User already participate in another company!";
        public const string ClientAlreadyExist = "Client with Vat number:{0} already Exist!";
        public const string ClientDoesNotExist = "Client does not exist!";
        public const string InvoiceDoesNotExist = "Invoice with Id:{0} does not exist!";
        public const string AlreadyPaidInvoice = "You can not edit invoice which is already paid";
        public const string NotEnoughAvailableQuantity = "Not enough available quantity of item with  article number : {0}";
        public const string ForeignInvoice = "You can not change Invoice of other company.";
        public const string LockMoreThanOneInvoices = "You can not lock more than one invoices";
        public const string InvoiceAlreadyPaid = "Invoice which you try to access is already paid and can not be accessed";
        public const string InvalidServiceId = "Service with Id:{0} does not exist!";
        public const string InvalidArticle = "Article with ArticleNumber:{0} does not exist!";
        public const string BlockedClient = "Client {0} is blocked!";
        public const string InvalidNotificationId = "Notificiation witn Id: {0} does not exist!";
        public const string BlockedArticle= "Article {0} with article Number:{0} is blocked!";
        public const string BlockedService= "Service {0} with  Number:{0} is blocked!";
        public const string InvalidHomePageContent= "Content with id {0} does not exist!";

    




    }
}
