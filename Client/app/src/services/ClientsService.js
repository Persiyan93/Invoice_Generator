import  endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'

export const addNewClient=(newClient)=>{
    return dataservice.post(newClient,endpoints.addNewClient)
}