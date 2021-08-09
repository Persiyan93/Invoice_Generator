import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetchPost = (endpoint,data, triger, setTriger, actionAfterSuccessfullOperation) => {
    const [errors, setErrors] = useState([]);
    let history = useHistory();
   
    useEffect(() => {
        if (triger) {
            console.log(endpoint)
            console.log(data)
            dataService.post(data, endpoint)
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        setErrors([res.message]);
                    }
                    else {

                        let id = globalServices.getIdFromResponse(res.message);
                        // setResult(id)
                        setTriger(false)
                        actionAfterSuccessfullOperation();
                    }

                })
                .catch(err => {
                  
                    setErrors([err]);
                    //history.push('/Errors/ConnectionError')
                })




        }

    }, [triger]);



    return [errors];






}
export default useFetchPost;




