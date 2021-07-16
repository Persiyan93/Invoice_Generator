import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../../services/identityService.js';




const useStyles = (thema => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: thema.spacing(1)

        }
    }
}))

class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { classes,  nextStep, changeHandler, inputFields } = this.props;
        return (
            <form className={classes.root} >
                <TextField variant="outlined" value={inputFields.username} name="username" label="Потребителско име " onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.name} name="name" label="Име на потребителя" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.password} name="password" label="Парола" type="password" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.repatPassword} name="repatPassword" label="Повтори паролата" type="password" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.email} name="email" label="Имеил адрес" onChange={changeHandler} />

                <Button variant="contained" onClick={nextStep} color="primary">
                    Продължи
                </Button>

            </form>
        );
    }

}


export default withStyles(useStyles)(Register);