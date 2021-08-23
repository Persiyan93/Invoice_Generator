import { useState, useEffect,useContext } from 'react'
import { useHistory } from 'react-router'
import IdentityContext from '../Context/IdentityContext';
import NotificationContext from '../Context/NotificationContext'
import * as dataService from '../services/dataService'
import * as globalServices from '../services/globalServices'

// 
const useFetchPut = (endpoint,  triger, setTriger,data ,actionAfterSuccessfullOperation) => {
    const { user, setUser } = useContext(IdentityContext)
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    useEffect(() => {
        if (triger) {
            console.log(triger)
            console.log(endpoint)
            console.log(data)
            dataService.put(data, endpoint)
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
export default useFetchPut;




