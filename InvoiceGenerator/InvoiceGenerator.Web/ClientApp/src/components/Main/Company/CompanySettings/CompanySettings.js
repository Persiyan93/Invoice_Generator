import { useState, useContext } from 'react';
import {
    Paper, makeStyles, Button, Typography, Select, MenuItem, Input, Checkbox, TextField, FormControl, FormControlLabel
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationContext from '../../../../Context/NotificationContext';
import useFetchPost from '../../../../hooks/useFetchPost';
import PageTitle from '../../../Elements/PageTitle';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchGet from '../../../../hooks/useFetchGet';


const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(2)
    },
    button: {
        marginBottom: '2px',
        marginLeft: '90%'
    },



}))
const companySettingsInitialValue = {
    defaultPaymentTerm: 0,
    sendAutomaticGeneratedEmails: false,
    blockClient: false,
    periodInDaysBetweenTwoRepatedEmails: 5,
    maxCountOfUnPaidInvoices: 10,
    defaultInvoiceLanguage: 'bg',
    defaultBankAccountId: ''
}

export default function CompanySettings(props) {
    const { setNotification } = useContext(NotificationContext);
    const [companySettings, setCompanySettings] = useState(companySettingsInitialValue);
    const [bankAccounts, setbankAccounts] = useState([]);

    //Get bank Accounts
    const [getBankAccountsTriger, setGetBankAccountsTrigger] = useState(true);
    useFetchGet(apiEndpoints.getBankAccounts, setbankAccounts, getBankAccountsTriger, setGetBankAccountsTrigger);


    // UpdateCompanySettings
    const [updateCompanySettingsTriger, setCompanysSettingsUpdateTriger] = useState(false)
    useFetchPost(apiEndpoints.updateCompanySettings, { ...companySettings }, updateCompanySettingsTriger, setCompanysSettingsUpdateTriger, actionAfterSuccessfullUpdatedSettings);

    //GetCompanySettings
    const [getCompanySettinsTriger, setGetCompanySettingsTriger] = useState(true);
    useFetchGet(apiEndpoints.getCompanySettings, setCompanySettings, getCompanySettinsTriger, setGetCompanySettingsTriger)


    function changeInvoiceLanguagehandler(event) {
        let value = event.target.value;
        setCompanySettings(prevState => ({ ...prevState, defaultInvoiceLanguage: value }))
    }
    function changeBankAccountHandler(event) {
        let value = event.target.value;
        setCompanySettings(prevState => ({ ...prevState, defaultInvoiceBankAccountId: value }))
    }

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
    function actionAfterSuccessfullUpdatedSettings() {
        setNotification({ isOpen: true, message: 'Настройките бяха запаметени успешно', severity: 'success' })
    }

    const classes = useStyles();
    console.log(companySettings)
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

                    <FormControl>

                        <Typography className={classes.title} component="h1" variant="subtitle1" gutterBottom={false} align="left">
                            Език на фактурата по подразбиране
                        </Typography>


                        <Select
                            value={companySettings.defaultInvoiceLanguage}
                            onChange={changeInvoiceLanguagehandler}
                            style={{ marginLeft: 30 }}
                        >
                            <MenuItem value={'en'}>Еnglish</MenuItem>
                            <MenuItem value={'bg'}>Български</MenuItem>

                        </Select>

                    </FormControl>

                    <FormControl className={classes.formElement}>

                        <Typography className={classes.title} component="h1" variant="subtitle1" gutterBottom={false} align="left">
                            Банкова сметка по подразбиране
                        </Typography>


                        <Select
                            value={companySettings.defaultBankAccountId}
                            onChange={changeBankAccountHandler}
                            style={{ marginLeft: 30 }}
                            input={<Input />}
                        >

                            {bankAccounts.map((account) => (

                                <MenuItem key={account.id} value={account.id}>
                                    {account.accountName}
                                </MenuItem>
                            ))}


                        </Select>

                    </FormControl>


                    <Button variant='contained' color='primary' type='submit' className={classes.button}>
                        Запази
                    </Button>
                </form >
            </Paper >
        </>
    )
}
