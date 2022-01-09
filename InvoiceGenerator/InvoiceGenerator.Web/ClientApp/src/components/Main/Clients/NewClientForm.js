import { useState } from 'react';
import { Paper, makeStyles, Button, InputLabel, Select, MenuItem, FormHelperText, Grid, TextField, FormControl } from '@material-ui/core'
import { validateClientInputModel } from '../../../services/validationService'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import useFetchPost from '../../../hooks/useFetchPost';
import apiEndpoints from '../../../services/apiEndpoints';
import PageTitle from '../../Elements/PageTitle';


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
    },
    main: {
        marginTop: theme.spacing(2)
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
    companyEmailAddress:'',
}
export default function NewClientForm(props) {
    const [errors, setErrors] = useState({})
    const [clientData, setClientData] = useState(clienDataInitialValues)

    //Hook which post 
    const [userDataPostTriger, setUserDataPostTriger] = useState(false)
    useFetchPost(apiEndpoints.addNewClient, { ...clientData }, userDataPostTriger, setUserDataPostTriger, actionsAfterSuccessfullyCompletedTask);


    function changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == 'addressText' || name == 'town' || name == 'country') {
            setClientData(prevState => ({ ...prevState, address: { ...prevState.address, [name]: value } }))
        }
        else {
            setClientData(prevState => ({ ...prevState, [name]: value }))
        }
    }

    function actionsAfterSuccessfullyCompletedTask() {
        props.history.push('/Clients/All');
    }


    function submitHandler(event) {
        event.preventDefault()

        if (validateClientInputModel(clientData, setErrors)) {
            setUserDataPostTriger(true)
        }

    }

    const classes = useStyles();
    const { companyName, companyType, vatNumber, accontablePersonName, uniqueIdentificationNumber, address, companyEmailAddress } = clientData
    return (

        <div className={classes.main}>
            <PageTitle
                title="Клиенти"
                icon={<GroupAddIcon fontSize='large' />}
                subTitle="Нов Клиент"
            />

            <Paper className={classes.pageContent}>
                <form className={classes.root} onSubmit={submitHandler} noValidate >
                    <Grid container >
                        <Grid item md={6} >

                            <TextField
                                required
                                helperText={errors.companyName}
                                error={errors.companyName}
                                variant="outlined"
                                value={companyName}
                                name="companyName"
                                label="Име на фирмата"
                                onChange={changeHandler} />
                            <TextField
                                helperText={errors.vatNumber}
                                error={errors.vatNumber}
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
                                onChange={changeHandler}
                            />

                            <TextField
                                value={uniqueIdentificationNumber}
                                name="uniqueIdentificationNumber" label="ЕИК"
                                error={errors.uniqueIdentificationNumber}
                                helperText={errors.uniqueIdentificationNumber}
                                variant="outlined"  
                                onChange={changeHandler}
                            />

                            <TextField
                                value={companyEmailAddress}
                                helperText={errors.email}
                                error={errors.email}
                                variant="outlined"
                                name="companyEmailAddress" label="Имеил"
                                onChange={changeHandler}
                            />





                        </Grid>
                        <Grid item md={5} >
                            <TextField
                                helperText={errors.country}
                                error={errors.country}
                                required
                                variant="outlined"
                                name="country"
                                value={address.country}
                                label="Държава на регистрация"
                                onChange={changeHandler}
                            />

                            <TextField
                                helperText={errors.town}
                                error={errors.town}
                                required variant="outlined"
                                name="town"
                                value={address.town}
                                label="Град"
                                onChange={changeHandler} />
                            <TextField
                                helperText={errors.addressText}
                                error={errors.addressText}
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
                                    error={errors.companyType}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="SoleТrader">ЕТ</MenuItem>
                                    <MenuItem value="LtdWithOneOwner">ЕООД</MenuItem>
                                    <MenuItem value="Ltd">ООД</MenuItem>
                                    <MenuItem value="JoinStockCompany">АД</MenuItem>
                                </Select>
                                <FormHelperText error={errors.companyType}>{errors.companyType}</FormHelperText>

                            </FormControl>





                        </Grid>


                    </Grid>
                    <Button variant='contained' color='primary' type='submit' className={classes.button}>Добави</Button>
                </form>
            </Paper>
        </div>
    )
}

