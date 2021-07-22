import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetch = (endpoint, triger,method='GET', data ) => {
    const [response, setResponse] = useState();

    let history = useHistory();

    useEffect(() => {
        if (triger != '') {
            console.log(triger)
            console.log(method)
            if (method == 'POST') {
                console.log('Inside post')
                dataService.post(data, endpoint)
                    .then(res => res.json())
                    .then(res => {
                        if (res.status == "Unsuccessful") {
                            console.log('Unsuccessful status ')
                            console.log(res);
                        }
                        else {
                            let id = globalServices.getIdFromResponse(res.message);
                            setResponse(id)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                        history.push('/Errors/ConnectionError')
                    })

            }
            else {
                console.log(endpoint)
                dataService.get(endpoint)
                    .then(res => res.json())
                    .then(res => {
                        if (res.status == "Unsuccessful") {
                            console.log('Unsuccessful status ')
                            console.log(res);
                        }
                        else {
                            console.log(res)
                            setResponse(res)
                        }

                    })
                    .catch(err => {
                        
                        console.log(err)
                        history.push('/Errors/ConnectionError')
                    })
            }
        }

    }, [triger]);



    return [response];


}

export default useFetch;




