import { useState, useEffect,useContext }from 'react'
import { useHistory } from 'react-router'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetchPut = (endpoint, triger, setTriger, data, actionAfterSuccessfullOperation) => {
    const { user, setUser } = useContext(IdentityContext)
    const { setNotification}= useContext(NotificationContext)
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    useEffect(() => {
    if (triger)
    {
        dataService.put(data, endpoint)
            .then(res => res.json())
            .then(res => {
            if (res.status === "Unsuccessful")
            {
                if (res.message === 'Not authorized')
                {
                    setUser({ isAuthenticated: false, permissions:[] })
                            history.push('/Identity/Login')
                        }
    else
    {
        setNotification({ isOpen: true, message: res.message, severity: 'error' })
                            window.scrollTo(0, 0)
                        }

setTriger(false)
                    }
                    else
{

    //let id = globalServices.getIdFromResponse(res.message);
    // setResult(id)
    console.log('Inside put')
                       setNotification({ isOpen: true, message: res.message, severity: 'success' })
                       window.scrollTo(0, 0)
                        actionAfterSuccessfullOperation();

    setTriger(false)
                    }

                })
                .catch (err => {

    setErrors([err]);

})




        }

    }, [triger]);



return [errors];






}
export default useFetchPut;




