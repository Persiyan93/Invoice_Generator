


export async function post(data, endpoint) {



    return fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            


        },
        body: JSON.stringify(data)

    })



};

export function get(endpoint) {
    var credential = !endpoint.split('://')[1].startsWith('p') ? 'include' : 'omit';
    return fetch(endpoint, {
        method: 'GET',
        credentials: credential,
     })

}

export function put(data, endpoint) {



    return fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
           

        },
        body: JSON.stringify(data)

    })



};


export function delteData(data, endpoint) {



    return fetch(endpoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            

        },
        body: JSON.stringify(data)

    })



};




