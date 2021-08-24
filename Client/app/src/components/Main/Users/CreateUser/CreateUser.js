import { useState, useEffect,useContext } from 'react';
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid, TextField, ThemeProvider, FormControl
    , FormControlLabel, FormLabel,
} from '@material-ui/core'
import useFetchPost from '../../../../hooks/useFetchPost';
import NotificationContext from '../../../../Context/NotificationContext'; 
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchGet from '../../../../hooks/useFetchGet';
import useFetchPut from '../../../../hooks/useFetchPut';
import PageTitle from '../../Elements/PageTitle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
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

const userDataInitialValues = {
    userName: '',
    email: '',
    fullName: '',
    accessAreas: {
        invoiceAccess: false,
        productsAccess: false,
        emailAccess: false,
        usersAccess: false

    }
}
export default function CreateUser(props) {
    const { userId, disableTextField, actionAfterSuccessFullyUpdatedUserAccess,disable } = props
    const [userData, setUserData] = useState(userDataInitialValues)
    const{setNotification}=useContext(NotificationContext);

    // Add new User
    const [userDataPostTriger, setUserDataPostTriger] = useState(false)
    useFetchPost(apiEndpoints.addUser, { ...userData }, userDataPostTriger, setUserDataPostTriger, actionAfterSuccessfullyAddedUser);

    //GetUserInfo
    const [getUserDataTriger, setGetUserDataTriger] = useState();
    var getUserDataUrl = apiEndpoints.users + `/${userId}`;
    useFetchGet(getUserDataUrl, setUserData, getUserDataTriger, setGetUserDataTriger)


    function actionAfterSuccessfullyAddedUser(){
        setNotification({isOpen:true,message:'Служителя беше добавен успешно',severity:'success'})
        props.history.push('/Users/All');
    }


    //Update user access 
    const [updateUserStatusTriger, setUpdateUserStatusTriger] = useState(false);
    var updateUserAccessUrl = apiEndpoints.updateUserAccess + `/${userId}`;
    useFetchPut(updateUserAccessUrl, updateUserStatusTriger, setUpdateUserStatusTriger, { ...userData.accessAreas }, actionAfterSuccessFullyUpdatedUserAccess)

    useEffect(() => {
        if (userId) {
            setGetUserDataTriger(true);
        }

    }, [])
    function changeHandler(e) {
        let value = e.target.value;
        let name = e.target.name;

        if (name === 'fullName' || name === 'userName' || name === 'email') {
            setUserData(prevState => ({ ...prevState, [name]: value }))

        }
        else {
            if (userData.accessAreas[name] === true) {
                setUserData(prevState => ({ ...prevState, accessAreas: { ...prevState.accessAreas, [name]: false } }))
            }
            else {
                setUserData(prevState => ({ ...prevState, accessAreas: { ...prevState.accessAreas, [name]: true } }))
            }

        }

    }
    function onSubmitHandler(e) {
        e.preventDefault()
        setUserDataPostTriger(true)
    }
    function updateUserAccessHandler(event) {
        event.preventDefault();
        setUpdateUserStatusTriger(true)
    }
    const classes = useStyles();

    return (
        <>
        {
            !disable&&
            <PageTitle
                title="Служители"
                icon={<PeopleAltIcon fontSize='large' />}
                subTitle="Нов Служител"
            />

        }
            
            <Paper className={classes.pageContent}>
                <form className={classes.root} onSubmit={userId ? updateUserAccessHandler : onSubmitHandler}>
                    <Grid container >
                        <Grid
                            item md={6}
                        >
                            <TextField
                                disabled={disableTextField}
                                required
                                name='userName'
                                onChange={changeHandler}
                                variant='outlined'
                                label='Потребителско име'
                                value={userData.userName}

                            />
                            <TextField
                                disabled={disableTextField}
                                required
                                name='fullName'
                                onChange={changeHandler}
                                variant='outlined'
                                label='Име и фамилия'
                                value={userData.fullName}

                            />
                            <TextField
                                disabled={disableTextField}
                                required
                                type='email'
                                name='email'
                                onChange={changeHandler}
                                variant='outlined'
                                label='Имейл адрес'
                                value={userData.email}

                            />


                        </Grid>
                        <Grid
                            item md={3}

                        >
                            <Typography variant="h6" component="h6">
                                Достъп  на потребителя:
                            </Typography>
                            <FormControl>

                                <FormControlLabel
                                    name='invoiceAccess'
                                    label='Достъп до фактури'
                                    //value={userData.accessAreas?.invoiceAccess}
                                    checked={userData.accessAreas?.invoiceAccess}
                                    //checked={userData.accessAreas?.invoiceAccess}

                                    onChange={changeHandler}
                                    control={<Checkbox color='primary' />} />


                                <FormControlLabel
                                    name='productsAccess'
                                    label='Достъп до артикули'

                                    checked={userData.accessAreas?.productsAccess}

                                    onChange={changeHandler}
                                    control={<Checkbox color='primary' />} />


                            </FormControl>



                        </Grid>
                        <Grid
                            item md={3}

                        >
                            <FormControl>
                                <FormControlLabel
                                    label='Досъп до имейлите'
                                    name='emailAccess'
                                    checked={userData.accessAreas?.emailAccess}
                                    onChange={changeHandler}
                                    control={<Checkbox color='primary' />} />

                                <FormControlLabel
                                    name='usersAccess'
                                    label='Достъп до потребителите и тяхната история'
                                    onChange={changeHandler}
                                    checked={userData.accessAreas?.usersAccess}
                                    control={<Checkbox color='primary' />} />


                            </FormControl>



                        </Grid>

                    </Grid>
                    <Button variant='contained' color='primary' type='submit' className={classes.button}>
                        {
                            userId ? "Запази промените" : "Добави"

                        }
                    </Button>
                </form>
            </Paper>
        </>
    )
}
