import  endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'

export const addNewClient=(newClient)=>{
    
    return dataservice.post(newClient,endpoints.addNewClient)
}
export const getClientInfo=(clientId)=>{
    console.log(clientId)
    return dataservice.get(endpoints.clientInfo+`/${clientId}`);
}

export const getAllClients=()=>{
    
    return dataservice.get(endpoints.allClients);
}

export const addMailingAddress=(mailingAddress)=>{
    return dataservice.post(mailingAddress,endpoints.addMailingAddress);
}
export const updeteAddress=(address)=>{
    return dataservice.post(address,endpoints.addMailingAddress);
}

export const addContactPerson=(contactPerson)=>{
    return dataservice.post(contactPerson,endpoints.contactList);
}
export const getContactList=(clientId)=>{
    return dataservice.get(endpoints.contactList+`/${clientId}`);
}
export const getAdditionalInfo=(clientId)=>{
    return dataservice.get(endpoints.additinalClientInfo+`/${clientId}`);
}

