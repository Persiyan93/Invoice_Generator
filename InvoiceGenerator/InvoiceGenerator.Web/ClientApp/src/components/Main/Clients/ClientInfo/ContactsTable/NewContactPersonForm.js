import { useEffect, useState } from 'react'
import useFetchPost from '../../../../../hooks/useFetchPost'
import apiEndpoints from '../../../../../services/apiEndpoints';
import { TextField, makeStyles, Button } from '@material-ui/core/';
import * as clientService from '../../../../../services/clientsService';
import * as globalService from '../../../../../services/globalServices'
import { useGridContainerProps } from '@material-ui/data-grid';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
            display: 'flex'

        },

    },



}))

const initialPersonvalues = {
    id: '',
    name: '',
    email: '',
    phoneNumber: ''
}

export default function ContactPersonForm(props) {
    let { clientId, setContactList, setOpenPopup } = props
    const [contactPerson, setContactPerson] = useState(initialPersonvalues);

    const [postContactPersonTriger, setPostContactPersonTriger] = useState(false);
    useFetchPost(apiEndpoints.contactList, { ...contactPerson, clientId }, postContactPersonTriger
        , setPostContactPersonTriger, actionAfterSuccessfulyAddedContactPerson)


    function actionAfterSuccessfulyAddedContactPerson() {
        console.log('after successfuull')
        setContactList(prevState => ([...prevState, contactPerson]))
        setOpenPopup(false)
    }

    function onSubmitHandler(event) {
        console.log('Inside submit handler')
        event.preventDefault();
        setPostContactPersonTriger(true);


    }

    function onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        setContactPerson(prevState => ({ ...prevState, [name]: value }))
    }

    const classes = useStyles();

    const { name, email, phoneNumber } = contactPerson

    return (
        <form className={classes.root} onSubmit={onSubmitHandler} >
            <TextField className={classes.inputField} name="name" value={name} required label="Име" onChange={onChangeHandler} />
            <TextField className={classes.inputField} name="email" value={email} required label="Имейл адрес" onChange={onChangeHandler} />
            <TextField className={classes.inputField} name="phoneNumber" value={phoneNumber} required label="Телефонен номер" onChange={onChangeHandler} />
            <Button variant="outlined" color="primary" type="submit" >  Добави</Button>
        </form>
    )

}

