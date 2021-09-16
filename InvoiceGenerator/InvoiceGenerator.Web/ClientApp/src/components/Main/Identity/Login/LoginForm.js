import { useState, useContext } from 'react';
import {Paper, makeStyles, Button, Typography, Grid, TextField} from '@material-ui/core'
import { Link } from 'react-router-dom';
import * as identityService from '../../../../services/identityService';
import IdentityContext from '../../../../Context/IdentityContext'
import NotificationContext from '../../../../Context/NotificationContext';
import BackgroundImage from '../../../../resources/identityImage.jpg'
const useStyles = makeStyles(theme => ({
    backgroundImage: {
        backgroundImage: `url(${BackgroundImage})`,
        position: 'fixed',
        minHeight: '100%',
        minWidth: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat'

    },
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(2),
        }
    },
    pageContent: {
        opacity: 0.9,
        marginLeft: '25%',
        marginTop: '40px',
        width: '50%',
        height: '400px',
        borderRadius: 10,
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        marginLeft: '45%'
    },
    title: {
        marginBottom: theme.spacing(2)
    }


}))

const userDataInitialValues = {
    userName: '',
    password: ''
}
export default function LoginForm(props) {
    const { setUser } = useContext(IdentityContext)
    const { setNotification } = useContext(NotificationContext)
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
                         setNotification({ isOpen: true, message: res.message })
                }
                else {
                    let { permissions } = res
                    setUser({ isAuthenticated: true, permissions: { ...permissions } })
                    props.history.push(`/`)
                }

            })
            .catch(err => {

            })
    }
    const classes = useStyles();
    return (
        <div className={classes.backgroundImage}>
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
                    <Link to="/Identity/Register" >
                        <Typography className={classes.title} component="h1" variant="subtitle2" gutterBottom={false} align="center">
                            Регистрация
                </Typography>
                    </Link>
                    <Button variant='contained' color='primary' type='submit' className={classes.button}>Вход</Button>
                </form>
            </Paper>
        </div>
    )
}
