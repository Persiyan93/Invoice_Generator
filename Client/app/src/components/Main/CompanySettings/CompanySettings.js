import { useState, useEffect,useContext } from 'react';
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid, TextField, ThemeProvider, FormControl
    , FormControlLabel, FormLabel,
} from '@material-ui/core'
import NotificationContext from '../../../Context/NotificationContext';
import useFetchPost from '../../../hooks/useFetchPost';
import PageTitle from '../Elements/PageTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import apiEndpoints from '../../../services/apiEndpoints';
import useFetchGet from '../../../hooks/useFetchGet';


const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    button: {
        marginBottom: '2px',
        marginLeft: '90%'
    }


}))
const companySettingsInitialValue = {
    defaultPaymentTerm: 0,
    sendAutomaticGeneratedEmails: false,
    blockClient: false,
    periodInDaysBetweenTwoRepatedEmails: 5,
    maxCountOfUnPaidInvoices: 10
}

export default function CompanySettings(props) {
    const {setNotification}=useContext(NotificationContext);
    const [companySettings, setCompanySettings] = useState(companySettingsInitialValue);


    // UpdateCompanySettings
    const [updateCompanySettingsTriger, setCompanysSettingsUpdateTriger] = useState(false)
    useFetchPost(apiEndpoints.updateCompanySettings, { ...companySettings }, updateCompanySettingsTriger, setCompanysSettingsUpdateTriger,actionAfterSuccessfullUpdatedSettings);

    //GetCompanySettings
    const [getCompanySettinsTriger, setGetCompanySettingsTriger] = useState(true);
    useFetchGet(apiEndpoints.getCompanySettings, setCompanySettings, getCompanySettinsTriger, setGetCompanySettingsTriger)




    function changeHandler(e) {
        let value = e.target.value;
        let name = e.target.name;

        if (name === 'defaultPaymentTerm' || name === 'periodInDaysBetweenTwoRepatedEmails' || name === 'maxCountOfUnPaidInvoices') {
            setCompanySettings(prevState => ({ ...prevState, [name]: value }))

        }
        else {
            if (companySettings[name] === true) {
                setCompanySettings(prevState => ({ ...prevState, [name]: false }))
            }
            else {
                setCompanySettings(prevState => ({ ...prevState, [name]: true }))
            }

        }


    }
    function onSubmitHandler(e) {
        e.preventDefault()
        setCompanysSettingsUpdateTriger(true)
    }
    function actionAfterSuccessfullUpdatedSettings(){
        setNotification({isOpen:true,message:'Настройките бяха запаметени успешно',severity:'success'})
    }

    const classes = useStyles();

    return (
        <>
             
            <PageTitle
                title="Настройки"
                icon={<SettingsIcon fontSize='large' />}
                subTitle="Нстройки на фирмата"
            />
            <Paper className={classes.pageContent}>
                <form className={classes.root} onSubmit={onSubmitHandler}>

                    <TextField
                        type='number'
                        required
                        name='defaultPaymentTerm'
                        onChange={changeHandler}
                        variant='outlined'
                        label='Срок за плащане по подразбиране'
                        value={companySettings?.defaultPaymentTerm}

                    />
                    <FormControl>
                        <FormControlLabel
                            label='Изпращане на автоматични имейли при просрочване на фактура'
                            name='sendAutomaticGeneratedEmails'
                            checked={companySettings.sendAutomaticGeneratedEmails}
                            onChange={changeHandler}
                            control={<Checkbox color='primary' />} />


                        <TextField
                            disabled={!companySettings.sendAutomaticGeneratedEmails}
                            required={companySettings.sendAutomaticGeneratedEmails}
                            type='number'
                            name='periodInDaysBetweenTwoRepatedEmails'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Период между два имейла '
                            value={companySettings?.periodInDaysBetweenTwoRepatedEmails}

                        />
                    </FormControl>
                    <FormControl>
                        <FormControlLabel
                            label='Блокиране на клиента при достигане на определен лимит'
                            name='blockClient'
                            checked={companySettings.blockClient}
                            onChange={changeHandler}
                            control={<Checkbox color='primary' />} />


                        <TextField
                            disabled={!companySettings.blockClient}
                            required
                            type='number'
                            name='maxCountOfUnPaidInvoices'
                            onChange={changeHandler}
                            variant='outlined'
                            label='Максимален брой неплатени фактури'
                            value={companySettings?.maxCountOfUnPaidInvoices}

                        />
                    </FormControl>

                    <Button variant='contained' color='primary' type='submit' className={classes.button}>
                        Запази
                    </Button>
                </form >
            </Paper >
        </>
    )
}
