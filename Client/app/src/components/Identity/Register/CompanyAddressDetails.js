import React from "react";
import { Button, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../../services/identityService.js';




const useStyles = theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        }
    },
    forwordButton:{
        marginTop:theme.spacing(3),
        float:'right'
    },
    backButton:{
        marginTop:theme.spacing(2),
        float:'left'
    }
})

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { classes,  submitHandler, changeHandler, inputFields:{address:{country,town,addressText}},prevStep } = this.props;
        return (
            <form className={classes.root} onSubmit={submitHandler}>
                <TextField required variant="outlined" value={country} name="country" label="Държава" onChange={changeHandler} />
                <TextField required variant="outlined" value={town} name="town" label="Град" onChange={changeHandler} />
                <TextField  required variant="outlined" value={addressText} name="addressText" label="Адрес"  onChange={changeHandler} />
               
                <Button className={classes.backButton} variant="contained" onClick={prevStep}color="primary">
                    Назад
                </Button>
                <Button className={classes.forwordButton}variant="contained" type="submit" color="primary">
                    Създай профил
                </Button>
            </form>
        );
    }

}


export default withStyles(useStyles)(CompanyDetails);