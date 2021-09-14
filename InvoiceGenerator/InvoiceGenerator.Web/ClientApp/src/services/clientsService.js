import endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'



export const addMailingAddress = (mailingAddress) => {
    return dataservice.post(mailingAddress, endpoints.addMailingAddress);
}