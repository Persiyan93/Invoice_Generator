import { downloadInvoice } from "./invoiceService";

const baseUrl = 'http://localhost:45163/api';

export default {
    addNewClient: `${baseUrl}/Clients`,
    clientInfo: `${baseUrl}/Clients`,
    getClientInfo:`${baseUrl}/Clients`,
    allClients: `${baseUrl}/Clients`,
    updateClientStatus:`${baseUrl}/Clients/UpdateClientStatus`,
    login: `${baseUrl}/Identity`,
    addMailingAddress: `${baseUrl}/MailingAddress`,
    contactList: `${baseUrl}/ContactList`,
    getContactList: `${baseUrl}/ContactList`,
    getAdditionalClientInfo: `${baseUrl}/Clients/additionalInfo`,
    register: `${baseUrl}/Identity/Register`,
    companyInfo: `${baseUrl}/Company`,
    addArticle: `${baseUrl}/Articles`,
    updateArticle: `${baseUrl}/Articles`,
    newService: `${baseUrl}/Services`,
    getAllArticles: `${baseUrl}/Articles`,
    getAllServices: `${baseUrl}/Services`,
    addNewInvoice: `${baseUrl}/Invoices`,
    getUnCompleteInvoice: `${baseUrl}/Invoices`,
    updateInvoiceDetails: `${baseUrl}/Invoices`,
    invoices: `${baseUrl}/Invoices`,
    updateInvoiceStatus:`${baseUrl}/Invoices/Status`,
    documents:`${baseUrl}/Documents`,
    addUser:`${baseUrl}/Users`,
    users:`${baseUrl}/Users`,
    getUsers:`${baseUrl}/Users`,
    setNewPassword:`${baseUrl}/Users/NewPassword`,
    getHistory:`${baseUrl}/History`,
    getEventTypes:`${baseUrl}/History/EventTypes`,
    getUserInfo:`${baseUrl}/Users/GetUserInfo`,
    getNotifications:`${baseUrl}/Notifications`,
    updateUserAccess:`${baseUrl}/Users/UpdateUserAccess`,
    getCompanySettings:`${baseUrl}/CompanySettings`,
    updateCompanySettings:`${baseUrl}/CompanySettings`,
    getInvoiHistory:`${baseUrl}/History/InvoiceHistory`,
    updateArticleQuantity:`${baseUrl}/Articles/ArticleQuantity`,
    addNewService:`${baseUrl}/Services`,
    updateServiceStatus:`${baseUrl}/Services`,
    getUnreadNotifications:`${baseUrl}/Notifications/Unread`,
    updateNotificationStatus:`${baseUrl}/Notifications`,
    getHomePageContentTtypes:`${baseUrl}/HomePageContent`,
    addNewContentToUserHomepage:`${baseUrl}/HomePageContent`,
    getUserHomePageContent:`${baseUrl}/HomePageContent/UserHomePageContent`,
    deleteContentFromHomePage:`${baseUrl}/HomePageContent`,
    generateInvoice:`${baseUrl}/Documents`,
    getClientInvoices:`${baseUrl}/Invoices/ClientInvoices`,
    getTopArticles:`${baseUrl}/Articles/TopTenArticles`,
    getInvoiceAsPdf:`${baseUrl}/Documents`,
    getTopClients:`${baseUrl}/Clients/TopClients`,

    


    

}