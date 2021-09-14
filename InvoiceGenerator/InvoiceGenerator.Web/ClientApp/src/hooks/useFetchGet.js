import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import * as dataService from '../services/dataService'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as globalServices from '../services/globalServices'


const useFetchGet = (endpoint, setResult, triger, setTriger) => {
    const [errors, setErrors] = useState();
    const { user, setUser } = useContext(IdentityContext)
    const { setNotification } = useContext(NotificationContext)


    let history = useHistory();

    useEffect(() => {
        if (triger) {
            dataService.get(endpoint)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.Status === "Unsuccessful") {
                        console.log('insideError')
                        if (res.Message === 'Not authorized') {
                            setUser({ isAuthenticated: false, permissions: [] })
                            history.push('/Identity/Login')
                        }
                        else {
                            setNotification({ isOpen: true, message: res.Message, severity: 'error' })
                        }

                        setTriger(false)
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




