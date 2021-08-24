import { useState, useEffect, useContext } from 'react'
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
            console.log(endpoint)
            console.log(data);
            dataService.post(data, endpoint)
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
                       
                        setTriger(false)
                        actionAfterSuccessfullOperation();
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




