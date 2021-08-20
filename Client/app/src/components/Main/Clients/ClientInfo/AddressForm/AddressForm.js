import { useState, useEffect } from 'react';
import { TextField, withStyles, Button, makeStyles } from '@material-ui/core/';
import * as clientService from '../../../../../services/clientsService';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
            display: 'flex'

        },

    },



}))

export default function AddressForm(props) {
    const [address, setAddress] = useState({})

    useEffect(() => {
        setAddress({ ...props.fieldValues })

    }, [])



    function onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value
        setAddress(prevState => ({ ...prevState, [name]: value }))



    }
    function onSubmitHandler(event) {
        event.preventDefault();
        props.updateAddress(address);
        props.setOpenPopup();

    }



    const { country, town, addressText } = address
    const classes = useStyles();
    return (
        <form className={classes.root} onSubmit={onSubmitHandler} >
            <TextField className={classes.inputField} name="country" value={country} required label="Държава" onChange={onChangeHandler} />
            <TextField className={classes.inputField} name="town" value={town} required label="Град" onChange={onChangeHandler} />
            <TextField className={classes.inputField} name="addressText" value={addressText} required label="Адрес" onChange={onChangeHandler} />
            <Button variant="outlined" color="primary" type="submit" >  Добави</Button>
        </form>
    )


}

