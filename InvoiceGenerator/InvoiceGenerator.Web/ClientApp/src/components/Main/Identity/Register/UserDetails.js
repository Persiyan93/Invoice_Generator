import { useState } from 'react'
import { validateUserDetails } from '../../../../services/validationService'
import { makeStyles, Button, TextField, Paper, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        }
    },
    pageContent: {
        position: 'absolute',
        opacity: 0.9,
        marginLeft: '25%',
        width: '50%',
        height: 'auto',
        borderRadius: 9,
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    button: {
        position: 'relative',
        left: '75%',
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(1)
        

    },

}))


export default function UserDetails(props) {
    const { nextStep, changeHandler, inputFields } = props;
    const [errors, setErrors] = useState({})

    function submitHandler(e) {
        e.preventDefault()
        if (validateUserDetails(inputFields, setErrors)) {
            nextStep()
        }

    }
    const classes = useStyles();

   
    return (

        <Paper className={classes.pageContent}>
            <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
                Регистрация
             </Typography>
            <form className={classes.root} onSubmit={submitHandler} noValidate >
                <TextField
                    helperText={errors.username}
                    error={errors.username!=undefined}
                    variant="outlined"
                    value={inputFields.username}
                    name="username"
                    label="Потребителско име "
                    onChange={changeHandler}
                />

                <TextField
                    required
                    helperText={errors.name}
                    error={errors.name!=undefined}
                    variant="outlined"
                    value={inputFields.name}
                    name="name"
                    label="Име и Фамилия"
                    onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.password}
                    error={errors.password!=undefined}
                    variant="outlined"
                    value={inputFields.password}
                    name="password"
                    label="Парола"
                    type="password" onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.repeatPassword}
                    error={errors.repeatPassword!=undefined}
                    variant="outlined"
                    value={inputFields.repatPassword}
                    name="repatPassword"
                    label="Повтори паролата" type="password" onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.email}
                    error={errors.email!=undefined}
                    variant="outlined"
                    value={inputFields.email}
                    name="email"
                    label="Имеил адрес"
                    onChange={changeHandler}
                />

                <Button className={classes.button} variant="contained" type='submit' color="primary">
                    Продължи
            </Button>

            </form>

        </Paper>

    );


}


