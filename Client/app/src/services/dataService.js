

var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('Bearer'))
if (cookieValue) {
    cookieValue = cookieValue.replace('=', ' ');
}


export function post(data, endpoint) {

console.log(endpoint)

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



