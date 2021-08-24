

import { useState, useContext } from 'react';
import {
    Paper, makeStyles, Button,
    InputLabel, Select, MenuItem, FormHelperText, Grid, TextField, FormControl
} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import useFetchPost from '../../../../hooks/useFetchPost';
import apiEndpoints from '../../../../services/apiEndpoints';
import PageTitle from '../../Elements/PageTitle';
import NotificationContext from '../../../../Context/NotificationContext';

const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    button: {
        marginBottom: '2px',
        marginLeft: '90%'
    }


}))

const clienDataInitialValues = {
    companyName: '',
    companyType: '',
    address: {
        addressText: '',
        town: '',
        country: ''
    },
    vatNumber: '',
    accontablePersonName: '',
    uniqueIdentificationNumber: '',
}
export default function AddClient(props) {
    const { setNotification } = useContext(NotificationContext)
    const [clientData, setClientData] = useState(clienDataInitialValues)
    const [accessAreas, setaccessAreas] = useState({})
    const [userDataPostTriger, setUserDataPostTriger] = useState(false)
    useFetchPost(apiEndpoints.addNewClient, { ...clientData }, userDataPostTriger, setUserDataPostTriger, actionsAfterSuccessfullyCompletedTask);
    function changeHandler(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value + '     ' + name);

        if (name == 'addressText' || name == 'town' || name == 'country') {

            setClientData(prevState => ({ ...prevState, address: { ...prevState.address, [name]: value } }))
            console.log(clientData)
        }
        else {
            setClientData(prevState => ({ ...prevState, [name]: value }))

        }
    }

    function actionsAfterSuccessfullyCompletedTask() {
        setNotification({ isOpen: true, message: 'Успешно добвен клиент', severity: 'success' })
    }
    function submitHandler(event) {
        event.preventDefault()
        setUserDataPostTriger(true)
        props.history.push('/Clients/All');
    }

    const classes = useStyles();
    const { companyName, companyType, vatNumber, accontablePersonName, uniqueIdentificationNumber, address } = clientData
    return (
        <>
            <PageTitle
                title="Клиенти"
                icon={<GroupAddIcon fontSize='large' />}
                subTitle="Нов Клиент"

            >

            </PageTitle>
            <Paper className={classes.pageContent}>
                <form className={classes.root} onSubmit={submitHandler}>
                    <Grid container >
                        <Grid
                            item md={6}
                        >

                            <TextField
                                required
                                variant="outlined"
                                value={companyName}
                                name="companyName"
                                label="Име на фирмата"
                                onChange={changeHandler} />




                            <TextField
                                required variant="outlined"
                                name="vatNumber"
                                value={vatNumber}
                                label="ДДС номер"
                                onChange={changeHandler} />


                            <TextField
                                variant="outlined"
                                value={accontablePersonName}
                                name="accontablePersonName"
                                label="Материално отговорно лице "
                                onChange={changeHandler} />

                            <TextField
                                required variant="outlined"
                                value={uniqueIdentificationNumber}
                                name="uniqueIdentificationNumber" label="ЕИК"
                                onChange={changeHandler} />





                        </Grid>
                        <Grid
                            item md={5}

                        >
                            <TextField
                                required
                                variant="outlined"
                                name="country"
                                value={address.country}
                                label="Държава на регистрация"
                                onChange={changeHandler} />

                            <TextField
                                required variant="outlined"
                                name="town"
                                value={address.town}
                                label="Град"
                                onChange={changeHandler} />
                            <TextField
                                required variant="outlined"
                                value={address.addressText}
                                name="addressText"
                                label="Адрес"
                                onChange={changeHandler} />


                            <FormControl className={classes.formControl} >
                                <InputLabel>Вид на компанията</InputLabel>
                                <Select
                                    name="companyType"
                                    value={companyType}
                                    onChange={changeHandler}
                                    className={classes.selectEmpty}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="SoleТrader">ЕТ</MenuItem>
                                    <MenuItem value="LtdWithOneOwner">ЕООД</MenuItem>
                                    <MenuItem value="Ltd">ООД</MenuItem>
                                    <MenuItem value="JoinStockCompany">АД</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>





                        </Grid>


                    </Grid>
                    <Button variant='contained' color='primary' type='submit' className={classes.button}>Добави</Button>
                </form>
            </Paper>
        </>
    )
}

