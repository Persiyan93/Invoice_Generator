import { useState } from 'react'
import { Button, TextField, MenuItem, InputLabel, Select, FormControl, makeStyles, Paper, Typography } from "@material-ui/core";
import { validateCompanyDetails } from '../../../../services/validationService'
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
    forwordButton: {
        position: 'relative',
        left: '61%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
       

    },
    backButton: {
        marginTop: theme.spacing(2),
        marginLeft:theme.spacing(2)
    }

}))


export default function CompanyDetails(props) {
    const [errors, setErrors] = useState({})
    const { nextStep, changeHandler, inputFields, prevStep, changeCompanyTypeHandler } = props;

    function submitHandler(e) {
        e.preventDefault()
        if (validateCompanyDetails(inputFields, setErrors)) {
            nextStep();
        }

    }

    const classes = useStyles();
    return (
        <Paper className={classes.pageContent}>
            <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
                Данни на фирмата
             </Typography>
            <form className={classes.root} onSubmit={submitHandler} noValidate>
                <TextField
                    required
                    helperText={errors.companyName}
                    error={errors.companyName!=undefined}
                    variant="outlined"
                    value={inputFields.companyName}
                    name="companyName"
                    label="Име на фирмата"
                    onChange={changeHandler}
                />
                <FormControl  >
                    <InputLabel>Вид на компанията</InputLabel>
                    <Select
                        required
                        error={errors.companyType!=undefined}
                        name="companyType"
                        value={inputFields.companyType}
                        onChange={changeCompanyTypeHandler}
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"SoleTrader"}>ЕТ</MenuItem>
                        <MenuItem value={"LtdWithOneOwner"}>ЕООД</MenuItem>
                        <MenuItem value={"JoinStockCompany"}>АД</MenuItem>
                        <MenuItem value={"Ltd"}>ООД</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    helperText={errors.vatNumber}
                    error={errors.vatNumber!=undefined}
                    required
                    variant="outlined"
                    value={inputFields.vatNumber}
                    name="vatNumber"
                    label="ДДС номер"
                    onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.uniqueIdentificationNumber}
                    error={errors.uniqueIdentificationNumber!=undefined}
                    variant="outlined"
                    value={inputFields.uniqueIdentificationNumber}
                    name="uniqueIdentificationNumber"
                    label="ЕИК"
                    onChange={changeHandler}
                />
                <TextField
                    variant="outlined"
                    value={inputFields.accountablePersonName}
                    name="accountablePersonName"
                    label="Материално отговорно лице"
                    onChange={changeHandler}
                />

                <TextField
                    required
                    variant="outlined"
                    value={inputFields.companyEmail}
                    name="companyEmail"
                    label="Имейл адрес на фирмата"
                    onChange={changeHandler}
                />

                <Button className={classes.backButton} variant="contained" onClick={prevStep} color="primary">
                    Назад
             </Button>
                <Button className={classes.forwordButton} variant="contained" type="submit" color="primary">
                    Продължи
             </Button>




            </form>
        </Paper>
    );


}
