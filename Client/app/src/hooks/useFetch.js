import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
 import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetch = (endpoint, data, method) => {
    const [response, setResponse] = useState({});
     let history = useHistory();
    const pesho=2;

    useEffect(() => {
        if (method === 'post') {
            dataService.post(data, endpoint)
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        console.log('Unsuccessful status ')
                        console.log(res);
                    }
                    else {
                        let id = globalServices.getIdFromResponse(res.message)
                        setResponse(id)
                    }

                })
                .catch(err => {
                    console.log(err)
                    history.push('/Errors/ConnectionError')
                })

        }
        else {
            dataService.get(endpoint)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status == "Unsuccessful") {
                        console.log('Unsuccessful status ')
                        console.log(res);
                    }
                    else {
                        setResponse(res)
                    }

                })
                .catch(err => {
                    console.log(err)
                    history.push('/Errors/ConnectionError')
                })
        }

    }, []);



    return [response];


}

export default useFetch;




