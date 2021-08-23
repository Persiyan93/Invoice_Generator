import { useState, useEffect,useContext } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as globalServices from '../services/globalServices'


const useFetchGet = (endpoint, setResult, triger, setTriger) => {
    const [errors, setErrors] = useState();
    const { user, setUser } = useContext(IdentityContext)


    let history = useHistory();

    useEffect(() => {
        if (triger) {
            console.log('Endpoint            ' + endpoint)

            dataService.get(endpoint)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === "Unsuccessful") {
                        if (res.message = 'Not authorized') {
                            setUser({ isAuthenticated: false, permissions: [] })
                            history.push('/Identity/Login')
                        }
                        else {
                            setErrors([res.message]);
                        }


                    }
                    else {
                        
                        setResult(res)
                        setTriger(false);



                    }

                })
                .catch(err => {
                    console.log(err)
                   
                })


        }

    }, [triger]);



    return [errors];


}

export default useFetchGet;




