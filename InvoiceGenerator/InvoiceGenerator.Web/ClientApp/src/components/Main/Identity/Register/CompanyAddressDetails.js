import { useState } from 'react'
import { Button, TextField, makeStyles,Paper,Typography } from "@material-ui/core";
import { validateCompanyAddressDetails } from '../../../../services/validationService'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        }
    },
    pageContent: {
        position: 'relative',
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
        marginLeft: theme.spacing(2)
    }

}))





export default function CompanyAddressDetails(props) {
    const { submit, changeHandler, inputFields, prevStep } = props;
    const [errors, setErrors] = useState({});

    function submitHandler(e) {
        e.preventDefault()
        if (validateCompanyAddressDetails(inputFields, setErrors)) {
            submit();
        }
    }
    const classes = useStyles();
    return (
        <Paper className={classes.pageContent}>
            <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
              Адрес на фирмата 
             </Typography>
            <form className={classes.root} onSubmit={submitHandler} noValidate>
                <TextField
                    required
                    helperText={errors.country}
                    error={errors.country != undefined}
                    variant="outlined"
                    value={inputFields.country}
                    name="country"
                    label="Държава"
                    onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.town}
                    error={errors.town!=undefined}
                    variant="outlined"
                    value={inputFields.town}
                    name="town"
                    label="Населено място"
                    onChange={changeHandler}
                />
                <TextField
                    required
                    helperText={errors.addressText}
                    error={errors.addressText!=undefined}
                    variant="outlined"
                    value={inputFields.addressText}
                    name="addressText"
                    label="Адрес"
                    onChange={changeHandler}
                />

                <Button className={classes.backButton} variant="contained" onClick={prevStep} color="primary">
                    Назад
                </Button>
                <Button className={classes.forwordButton} variant="contained" type="submit" color="primary">
                    Създай профил
                </Button>
            </form>
        </Paper>
    );
}




