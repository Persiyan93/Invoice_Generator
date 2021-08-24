
import * as  cookieService from './cookieService'


let cookieValue =  cookieService.getCookieValue();









export  async function  post(data, endpoint) {

 
  
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookieValue

        },
        body: JSON.stringify(data)

    })



};

export function get(endpoint) {
    console.log(endpoint)
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': cookieValue
        }
    }
    )

}

export function put(data, endpoint) {

 

    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookieValue

        },
        body: JSON.stringify(data)

    })



};


export function delteData(data, endpoint) {



    return fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookieValue

        },
        body: JSON.stringify(data)

    })



};




