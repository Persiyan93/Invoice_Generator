import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as globalServices from '../services/globalServices'


const useFetchGet = (endpoint, setResult, triger, setTriger, actionAfterSuccessfullyOperation) => {
    const [errors, setErrors] = useState();
    const { user, setUser } = useContext(IdentityContext)
    const { setNotification } = useContext(NotificationContext)


    useEffect(() => {
        if (triger) {
            dataService.get(endpoint)
                .then(res => res.json())
                .then(res => {
                    if (res.Status === "Unsuccessful" || res.status === "Unsuccessful") {
                        if (res.Message === 'Not authorized' || res.message === "Not authorized") {
                            setUser({ isAuthenticated: false, permissions: [] })
                        }
                        else {
                            setNotification({ isOpen: true, message: res.Message, severity: 'error' })
                        }
                        setTriger(false)
                    }

                    else {
                        setResult(res)
                        setTriger(false);
                        if (actionAfterSuccessfullyOperation) {
                            actionAfterSuccessfullyOperation();
                        }
                      
                        
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




