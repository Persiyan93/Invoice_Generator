import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
const useStyles = (themе => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: themе.spacing(1)

        }
    },

    button: {
        marginTop: themе.spacing(5),
        marginLeft: '80%'
    },

}))

class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { classes, nextStep, changeHandler, inputFields } = this.props;
        return (
            <form className={classes.root} onSubmit={nextStep} >
                <TextField variant="outlined" value={inputFields.username} name="username" label="Потребителско име " onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.name} name="name" label="Име и Фамилия" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.password} name="password" label="Парола" type="password" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.repatPassword} name="repatPassword" label="Повтори паролата" type="password" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.email} name="email" label="Имеил адрес" onChange={changeHandler} />

                <Button className={classes.button} variant="contained" type='submit' color="primary">
                    Продължи
                </Button>

            </form>
        );
    }

}


export default withStyles(useStyles)(Register);