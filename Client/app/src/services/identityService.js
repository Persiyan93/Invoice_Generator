import * as dataService from'./dataService';
import apiEndpoints from './apiEndpoints';

export   function login (user){
    console.log(apiEndpoints.login)
    return dataService.post(user,apiEndpoints.login);

}