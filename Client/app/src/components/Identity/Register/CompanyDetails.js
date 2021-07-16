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

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { classes,  nextStep, changeHandler, inputFields,prevStep } = this.props;
        return (
            <form className={classes.root} onSubmit={nextStep}>
                <TextField variant="outlined" value={inputFields.name} name="companyName" label="Име на фирмата" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.vatNumber} name="vatNumber" label="ДДС номер" onChange={changeHandler} />
                <TextField variant="outlined" value={inputFields.uniqueIdentificationNumber} name="uniqueIdentificationNumber" label="ЕИК"  onChange={changeHandler} />
                <TextField  variant="outlined" value={inputFields.accontablePersonName} name="accontablePersonName" label="Материално отговорно лице"  onChange={changeHandler} />
                <TextField  variant="outlined" value={inputFields.companyEmail} name="companyEmail" label="Имейл адрес на фирмата"  onChange={changeHandler} />
                
                <Button variant="contained" type="submit" color="primary">
                    Продължи
                </Button>

                <Button variant="contained" onClick={prevStep}color="primary">
                    Назад
                </Button>
                

            </form>
        );
    }

}


export default withStyles(useStyles)(CompanyDetails);