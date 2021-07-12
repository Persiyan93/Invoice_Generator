

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
        .then(res => res)
        .catch(err => console.log(err))


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


