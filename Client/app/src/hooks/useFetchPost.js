import { useState, useEffect,useContext } from 'react'
import { useHistory } from 'react-router'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'


const useFetchPost = (endpoint, data, triger, setTriger, actionAfterSuccessfullOperation) => {
    const { user, setUser } = useContext(IdentityContext)
    const [errors, setErrors] = useState([]);
    const [isCompletedSuccessfully,setIsCompletedSuccessfully]=useState(false)
    let history = useHistory();

    useEffect(() => {
        if (triger) {
            console.log(endpoint)
            
            dataService.post(data, endpoint)
                .then(res => res.json())
                .then(res => {
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
                        console.log(res)
                    
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




