import React from "react";
import { Button, TextField, MenuItem, InputLabel, Select, FormControl } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';





const useStyles = (theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        }
    },
    forwordButton: {
        float: 'right'
    },
    backButton: {
        float: 'left'
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

        const { classes, nextStep, changeHandler, inputFields, prevStep } = this.props;
        return (
            <form className={classes.root} onSubmit={nextStep}>
                <TextField required variant="outlined" value={inputFields.name} name="companyName" label="Име на фирмата" onChange={changeHandler} />
                <FormControl  >
                    <InputLabel>Вид на компанията</InputLabel>
                    <Select
                        required
                        name="companyType"
                        value={inputFields.companyType}
                        onChange={changeHandler}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="SoleTrader">ЕТ</MenuItem>
                        <MenuItem value="LtdWithOneOwner">ЕООД</MenuItem>
                        <MenuItem value="JoinStockCompany">АД</MenuItem>
                        <MenuItem value=" Ltd">ООД</MenuItem>
                    </Select>
                </FormControl>
                <TextField required variant="outlined" value={inputFields.vatNumber} name="vatNumber" label="ДДС номер" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.uniqueIdentificationNumber} name="uniqueIdentificationNumber" label="ЕИК" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.accontablePersonName} name="accontablePersonName" label="Материално отговорно лице" onChange={changeHandler} />
                <TextField required variant="outlined" value={inputFields.companyEmail} name="companyEmail" label="Имейл адрес на фирмата" onChange={changeHandler} />

                <Button className={classes.backButton} variant="contained" onClick={prevStep} color="primary">
                    Назад
                </Button>
                <Button className={classes.forwordButton} variant="contained" type="submit" color="primary">
                    Продължи
                </Button>




            </form>
        );
    }

}


export default withStyles(useStyles)(CompanyDetails);