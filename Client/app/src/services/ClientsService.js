import api from "./api";

export const addNewClient=(newClient)=>{
    return fetch(api.addNewClient,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(newClient)
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
        

    
}