import  endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'

export const addNewClient=(newClient)=>{
    
    return dataservice.post(newClient,endpoints.addNewClient)
}
export const getClientInfo=(clientId)=>{
    console.log(clientId)
    return dataservice.get(endpoints.clientInfo+`/${clientId}`);
}