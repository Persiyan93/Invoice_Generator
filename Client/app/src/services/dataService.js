

var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('Bearer'))
if (cookieValue) {
    cookieValue = cookieValue.replace('=', ' ');
}


export function post(data, endpoint) {


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


