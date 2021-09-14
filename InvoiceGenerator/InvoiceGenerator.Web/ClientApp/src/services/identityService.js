import * as dataService from './dataService';
import apiEndpoints from './apiEndpoints';

export function login(user) {
    return dataService.post(user, apiEndpoints.login);

}

export function register(user) {

    return dataService.post(user, apiEndpoints.register);
}