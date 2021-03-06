import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

const useFetchPost = (endpoint, data, triger, setTriger, actionAfterSuccessfullOperation) => {

    const { user, setUser } = useContext(IdentityContext)
    const { setNotification } = useContext(NotificationContext);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    useEffect(() => {
        if (triger) {
            console.log(endpoint)
            console.log(data)
            dataService.delteData(data, endpoint)
                .then(res => res.json())
                .then(res => {
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
                        console.log(res)
                        console.log('successfull')

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




