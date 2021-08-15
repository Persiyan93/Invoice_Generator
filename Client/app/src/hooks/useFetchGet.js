import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'


const useFetchGet = (endpoint, setResult, triger, setTriger) => {
    const [errors, setErrors] = useState();


    let history = useHistory();

    useEffect(() => {
        if (triger) {
            console.log('Endpoint            '+endpoint)

            dataService.get(endpoint)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.Status == "Unsuccessful") {
                        console.log('Unsuccessful status ')
                        console.log(res);
                    }
                    else  {

                        console.log( 'Response'+res)
                        setResult(res)
                        setTriger(false);



                    }

                })
                .catch(err => {

                    console.log(err)
                    //history.push('/Errors/ConnectionError')
                })


        }

    }, [triger]);



    return [errors];


}

export default useFetchGet;




