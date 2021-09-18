﻿import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'


const useFetchPost = (endpoint, data, triger, setTriger, actionAfterSuccessfullOperation) => {
    const { user, setUser } = useContext(IdentityContext)
    const [errors, setErrors] = useState([]);
    const [isCompletedSuccessfully, setIsCompletedSuccessfully] = useState(false)
    const { setNotification } = useContext(NotificationContext)
    let history = useHistory();

    useEffect(() => {
        if (triger) {
            dataService.post(data, endpoint)
                .then(res => res.json())
                .then(res => {
                    console.log()
                    if (res.status === "Unsuccessful" || res.Status === "Unsuccessful") {

                        if (res.message === 'Not authorized') {
                            setUser({ isAuthenticated: false, permissions: [] })
                            history.push('/Identity/Login')
                        }
                        else {
                            setNotification({ isOpen: true, message: res.message, severity: 'error' })
                            window.scrollTo(0, 0)
                        }

                        setTriger(false)
                    }
                    else {
                        actionAfterSuccessfullOperation();
                        setNotification({ isOpen: true, message: res.message, severity: 'success' })
                        window.scrollTo(0, 0)
                        setTriger(false)
                    }

                })
                .catch(err => {

                    setErrors([err]);

                })




        }

    }, [triger]);



    return [errors];






}
export default useFetchPost;




