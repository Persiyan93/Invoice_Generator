import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetch = (endpoint, triger, setTriger, setResult, method = 'GET', data) => {
    const [errors, setErrors] = useState();


    let history = useHistory();
    console.log(triger);
    useEffect(() => {
        if (triger) {

            if (method == 'POST') {
                console.log(endpoint)
                console.log(data);
                console.log('Inside post')
                dataService.post(data, endpoint)
                    .then(res => res.json())
                    .then(res => {
                        if (res.status == "Unsuccessful") {

                        }
                        else {

                            let id = globalServices.getIdFromResponse(res.message);
                            // setResult(id)
                            setTriger(false)
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
                        if (res.status == "Unsuccessful") {
                            console.log('Unsuccessful status ')
                            console.log(res);
                        }
                        else {

                            //setResponse(res)

                            setResult(res)
                            setTriger(false);



                        }

                    })
                    .catch(err => {

                        console.log(err)
                        history.push('/Errors/ConnectionError')
                    })

            }
        }

    }, [triger]);



    return [errors];


}

export default useFetch;




