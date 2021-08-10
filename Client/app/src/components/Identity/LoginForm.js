import { useState, useContext } from 'react';
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid, TextField, ThemeProvider, FormControl
    , FormControlLabel, FormLabel,
} from '@material-ui/core'
import * as identityService from '../../services/identityService';
import * as  cookieService from '../../services/cookieService'
import IdentityContext from '../../Context/IdentityContext'
import NotificationContext from '../../Context/NotificationContext';
const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
        }
    },
    pageContent: {
        //backgroundColor:'#EAE8EE',
        marginLeft: '25%',
        width: '50%',
        height: '350px',
        borderRadius: 10,
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: '40%'
    },
    title: {
        marginBottom: theme.spacing(3)
    }


}))

const userDataInitialValues = {
    userName: '',
    password: ''
}
export default function LoginForm(props) {
    const {setUser}=useContext(IdentityContext)
    const {setNotification}=useContext(NotificationContext)
    const [userData, setUserData] = useState(userDataInitialValues)



    function changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUserData(prevState => ({ ...prevState, [name]: value }))
    }
    function submitHandler(event) {
        event.preventDefault();

        var user = { ...userData };
        identityService.login(user)
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log('Unsuccessful status ')
                   setNotification({isOpen:true,message:res.message}) 
                }
                else {
                    console.log(res)
                    let { token, expiration, permissions } = res
                    cookieService.createCookie(token, expiration)
                    setUser({isAuthenticated:true,permissions:{...permissions}})
                    props.history.push(`/`)
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    const classes = useStyles();
    return (

        <Paper className={classes.pageContent}>
            <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
                Вход в системата
            </Typography>
            <form className={classes.root} onSubmit={submitHandler}>
                <Grid container alignItems='center' alignContent='center' >
                    <Grid item md={2}></Grid>
                    <Grid
                        item md={9}
                    >
                        <TextField
                            required
                            name='userName'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Потребителско име'
                            value={userData.userName}

                        />

                        <TextField
                            required
                            type='password'
                            name='password'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Парола'
                            value={userData.password}

                        />





                    </Grid>

                </Grid>
                <Button variant='contained' color='primary' type='submit' className={classes.button}>Вход</Button>
            </form>
        </Paper>
    )
}
