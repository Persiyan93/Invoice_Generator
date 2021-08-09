const baseUrl = 'http://localhost:45163/api';

export default {
    addNewClient: `${baseUrl}/Clients`,
    clientInfo: `${baseUrl}/Clients`,
    allClients: `${baseUrl}/Clients`,
    login: `${baseUrl}/Identity`,
    addMailingAddress: `${baseUrl}/MailingAddress`,
    contactList: `${baseUrl}/ContactList`,
    additinalClientInfo: `${baseUrl}/Clients/additionalInfo`,
    register: `${baseUrl}/Identity/Register`,
    companyInfo: `${baseUrl}/Company`,
    newArticle: `${baseUrl}/Articles`,
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
    setNewPassword:`${baseUrl}/Users/NewPassword`,
    getHistory:`${baseUrl}/History`,
    getEventTypes:`${baseUrl}/History/EventTypes`

    

}