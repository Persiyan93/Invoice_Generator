
import Cookies from 'universal-cookie';
var cookies=new Cookies();

export function getCookieValue() {

    let cookieValue='Bearer '+cookies.get('Bearer');
   // console.log(cookieValue);
     return cookieValue

}

export function deleteCookieValue() {
    cookies.remove('Bearer');
}



export function createCookie(token,expiration) {
    let expirationDate = Date.parse(expiration);
    let maxAgeInSeconds = (expirationDate - Date.now()) / 1000;
     cookies.set('Bearer', token, { path: '/', maxAge: maxAgeInSeconds });
    
}

