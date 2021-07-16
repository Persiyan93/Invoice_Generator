import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../services/identityService';
import Cookies from 'universal-cookie';



const useStyles = (thema => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: thema.spacing(1)

        }
    }
}))

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

    }
    changeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        var user = { ...this.state };
        var response = identityService.login(user)
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log('Unsuccessful status ')
                    console.log(res);
                }
                else {
                    let { token, expiration } = res;
                    let expirationDate = Date.parse(expiration);
                    let maxAgeInSeconds = (expirationDate - Date.now()) / 1000;
                    const cookies = new Cookies();
                    cookies.set('Bearer', token, { path:'/', maxAge: maxAgeInSeconds });
                    this.props.history.push(`/`)
                }

            })
            .catch(err => {
                this.props.history.push('/Errors/ConnectionError')
            })

        
      



    }
    render() {
        const { username, password } = this.state;
        const { classes } = this.props;
        return (
            <form className={classes.root} onSubmit={this.submitHandler}>
                <TextField required variant="outlined" value={username} name="username" label="Потребител" onChange={this.changeHandler} />
                <TextField required variant="outlined" value={password} name="password" label="Парола" type="password" onChange={this.changeHandler} />



                <Button variant="contained" type="submit" color="primary">
                    Вход
                </Button>

            </form>
        );
    }

}


export default withStyles(useStyles)(Login);