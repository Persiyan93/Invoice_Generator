import endpoints from "./apiEndpoints";
import * as dataservice from '../services/dataService'

export const getAllArticles = () => {
    return dataservice.get(endpoints.getAllArticles);
}
