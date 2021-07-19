import React from "react";
import { Button, TextField,MenuItem,InputLabel,Select,FormControl } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import * as identityService from '../../../services/identityService.js';




const useStyles = (theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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
                <FormControl  >
                <InputLabel>Вид на компанията</InputLabel>
                    <Select
                        name="companyType"
                        value={inputFields.companyType}
                        onChange={changeHandler}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="SoleProprietorship">ЕТ</MenuItem>
                        <MenuItem value="LLC">ЕООД</MenuItem>
                        <MenuItem value="LTD">ООД</MenuItem>
                    </Select>
                    </FormControl>
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