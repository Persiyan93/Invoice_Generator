import { useState,useContext } from 'react';
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid, TextField, ThemeProvider, FormControl
    , FormControlLabel, FormLabel,
} from '@material-ui/core'
import useFetchPost from '../../hooks/useFetchPost';
import apiEndpoints from '../../services/apiEndpoints';
import NotificationContext from '../../Context/NotificationContext';
const useStyles = makeStyles(theme => ({

    root: {
        paddingLeft:theme.spacing(15),
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
        marginTop:theme.spacing(3),
        marginLeft: '40%'
    }


}))

const initialValues = {
    password: '',
    repeatPassword: '',

}
export default function CreateUser(props) {
    const { email, token } = props.match.params;
    const {setNotification}=useContext(NotificationContext)

    const classes = useStyles();
    const [data, setData] = useState(initialValues)
    const [passwordPostTriger, setPasswordPostTriger] = useState(false)
    var [errors] = useFetchPost(
        apiEndpoints.setNewPassword,
        { password: data.password, token, email },
        passwordPostTriger,
        setPasswordPostTriger,
        actionAfterPost
    );
    function changeHandler(e) {
        let value = e.target.value;
        let name = e.target.name;
        setData(prevState => ({ ...prevState, [name]: value }))


    }
    function actionAfterPost() {
        setNotification({isOpen:true,message:'Паролата беше сменена успешно',severity:'success'})
        props.history.push('/Identity/Login');
    }
    async function onSubmitHandler(e) {
        e.preventDefault()
        setPasswordPostTriger(true)
        if (errors.length === 0) {

        }
    }
    return (

        <Paper className={classes.pageContent}>
            <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
               Нова парола
            </Typography>
            <form className={classes.root} onSubmit={onSubmitHandler}>
                <Grid container alignItems='center' alignContent='center' >
                    <Grid
                        item md={12}
                    >
                        <TextField
                            required
                            type="password"
                            name='password'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Парола'
                            value={data.password}

                        />
                        <TextField
                            required
                            type="password"
                            name='repeatPassword'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Моля повторете паролата'
                            value={data.repeatPassword}

                        />



                    </Grid>


                </Grid>
                <Button variant='contained' color='primary' type='submit' className={classes.button}>Запази</Button>
            </form>
        </Paper>


    )
}
