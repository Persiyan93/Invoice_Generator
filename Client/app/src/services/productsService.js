import  endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'


export const addNewArticle=(article)=>{
    return dataservice.post(article,endpoints.newArticle);
}
export const addNewService=(service)=>{
   return dataservice.post(service,endpoints.newService);
}

export const getAllArticles=()=>{
    return dataservice.get(endpoints.getAllArticles);
 }
 export const getAllServices=()=>{
    return dataservice.get(endpoints.getAllServices);
 }