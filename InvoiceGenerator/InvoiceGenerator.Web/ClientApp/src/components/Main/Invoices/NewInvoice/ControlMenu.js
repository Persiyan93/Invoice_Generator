import { useState } from 'react'
import {
    makeStyles, Card, FormControlLabel, CardContent, Button, Typography, Checkbox
    , Grid, Select, MenuItem, TextField, Divider, Input
} from '@material-ui/core';
import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';

const useStyles = makeStyles({


    root: {
        backgroundColor: '#67876F',
    },
    card: {
        marginTop: '1px',
        width: 500,
        height: 200,
        display: 'inline-block',
        borderRadius: 7,
        background: '#E6EAE9'
    },
    paymentOptions: {
        width: 350,
        height: 200,
        display: 'inline-block',
        borderRadius: 7,
        background: '#E6EAE9'




    },
    buttons: {
        marginTop: '100px',
        marginBottom: '50px',
        paddingBottom: '100px'
    },
    cardElement: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: 15,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})
export default function ControlMenu(props) {

    const { saveInvoiceHandler, paymentMethod, paymentPeriod,
        setInvoiceDetails, isInvoiceWithZeroVatRate, editInvoiceHandler
        , reasonForInvoiceWithZeroVatRate, invoiceId, bankAccountId, changeBankAccountHandler, changeInvoiceLanguagehandler, invoiceLanguage } = props

    //Bank accounts
    const [bankAccounts, setBankAccounts] = useState([]);
    const [getBankAccountsTriger, setGetBankAccountsTriger] = useState(true);
    useFetchGet(apiEndpoints.getBankAccounts, setBankAccounts, getBankAccountsTriger, setGetBankAccountsTriger);




    function paymentPeriodChangeHandler(e) {
        let value = parseInt(e.target.value);
        setInvoiceDetails(prevState => ({ ...prevState, paymentPeriod: value }))
    }

    function paymentMethodChangeHandler(e) {
        let value = e.target.value
        setInvoiceDetails(prevState => ({ ...prevState, paymentMethod: value }))
    }

    function changeInvoiceVatRateHandler() {

        setInvoiceDetails(prevState => ({ ...prevState, isInvoiceWithZeroVatRate: !prevState.isInvoiceWithZeroVatRate }))
    }

    function changeReasonForNullVatRateHandler(event) {
        let value = event.target.value;
        setInvoiceDetails(prevState => ({ ...prevState, reasonForInvoiceWithZeroVatRate: value }))
    }

    const classes = useStyles();
    return (
        <>
            <Grid container alignItems="center">
                <Grid item md={1} />
                <Grid item md={4} >
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <div className={classes.еlement}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isInvoiceWithZeroVatRate}
                                            onChange={changeInvoiceVatRateHandler}
                                            name="checkedB"
                                            color="primary"

                                        />
                                    }
                                    label="Фактура с нулева ставка"
                                />
                            </div>

                            <div className={classes.cardElement} >

                                <Typography variant="subtitle1" component="h6" >
                                    Основание за нулева ставка :
                                </Typography>
                                <TextField disabled={!isInvoiceWithZeroVatRate} required={isInvoiceWithZeroVatRate} type="text" size="small" value={reasonForInvoiceWithZeroVatRate} onChange={changeReasonForNullVatRateHandler} />


                            </div>
                            <div className={classes.cardElement} >
                                <Typography variant="subtitle1" component="h6" >
                                    Език на Фактурата
                                </Typography>

                                <Select
                                    value={invoiceLanguage}
                                    onChange={changeInvoiceLanguagehandler}

                                >
                                    <MenuItem value={'en'}>Еnglish</MenuItem>
                                    <MenuItem value={'bg'}>Български</MenuItem>

                                </Select>
                            </div>


                        </CardContent>
                    </Card>
                </Grid>




                <Grid item md={3} />

                <Grid item >

                    <Card className={classes.paymentOptions} variant="outlined">
                        <CardContent>
                            <div className={classes.cardElement}>
                                <Typography variant="subtitle1" component="h6" >
                                    Начин на плащане:
                                </Typography>

                                <Select
                                    value={paymentMethod}
                                    onChange={paymentMethodChangeHandler}

                                >
                                    <MenuItem value={'BankTransfer'}>Банков превод</MenuItem>
                                    <MenuItem value={'Cash'}>В брой</MenuItem>

                                </Select>
                            </div>
                            <Divider />
                            <div className={classes.cardElement}>
                                <Typography variant="subtitle1" component="h6" >
                                    Банкова сметка:
                                </Typography>

                                <Select
                                    native
                                    value={bankAccountId}
                                    onChange={changeBankAccountHandler}
                                    input={<Input />}
                                >
                                    <option value=''>
                                        -
                                    </option>
                                    {bankAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.accountName}
                                        </option>
                                    ))}

                                </Select>
                            </div>
                            <Divider />
                            <div className={classes.cardElement} >

                                <Typography variant="subtitle1" component="h6" >
                                    Срок за плащане:
                                </Typography>
                                <TextField type="text" size="small" value={paymentPeriod} onChange={paymentPeriodChangeHandler} />
                                <Typography variant="subtitle1" component="h6" >
                                    дни
                                </Typography>
                            </div>


                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container alignItems="center" className={classes.buttons}>

                <Grid item md={9} />

                {
                    invoiceId ?
                        (
                            <Grid item md={2} >
                                <Button color='default' variant="contained" onClick={editInvoiceHandler}> Запази промените </Button>
                            </Grid>
                        )
                        :
                        (
                            <Grid item md={2}>
                                <Button color='default' variant="contained" onClick={saveInvoiceHandler}>
                                    Запази
                                </Button>
                            </Grid>
                        )


                }


                <Grid item md={3}></Grid>



            </Grid>

        </>

    )
}
