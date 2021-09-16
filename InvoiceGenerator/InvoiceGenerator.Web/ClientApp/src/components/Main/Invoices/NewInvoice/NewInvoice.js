import { useEffect, useState, useContext } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core/';
import CompanyInfoCard from './CompanyInfoCard';
import InvoiceInfo from './InvoiceInfo';
import ConfirmedProductsTable from './ConfirmedProductsTable';
import ControlMenu from './ControlMenu';
import useFetchGet from '../../../../hooks/useFetchGet'
import * as invoiceService from '../../../../services/invoiceService'
import apiEndpoints from '../../../../services/apiEndpoints'
import { validateInvoiceInputModel } from '../../../../services/validationService'
import NotificationContext from '../../../../Context/NotificationContext'
import queryString from "query-string";
import ProgressIndicator from '../../../Elements/ProgressIndicator'
import { saveAs } from 'file-saver';





import React from 'react';
const useStyles = makeStyles(theme => ({
    title: {
        display: 'inline',
        textAlign: 'center'

    },
    main: {
        margin: theme.spacing(4),
        borderRadius: 15,
        backgroundColor: '#F2F5FD',


    }
}))

const dateToday = new Date().toJSON().slice(0, 10)
const NewInvoice = (props) => {

    const { setNotification } = useContext(NotificationContext)
    const [isLoading, setLoading] = useState(false);
    const invoiceId = props.match.params['invoiceId'];
    const queryParameters = queryString.parse(props.location.search);
    const clientId = queryParameters.clientId
    const [companyInfoGetTriger, setCompanyInfoGetTriger] = useState(true)
    const [clientInfoGetTriger, setClientInfoGetTriger] = useState(false)
    const [invoiceDetailsGetTriger, setInvoiceDetailsGetTriger] = useState(false);
    const [companyInfo, setCompanyInfo] = useState();
    const [clientDetails, setClientDetails] = useState();
    const [invoiceDetails, setInvoiceDetails] = useState({
        clientId: '',
        articles: [],
        services: [],
        dateOfTaxEvent: dateToday,
        issueDate: dateToday,
        paymentPeriod: 0,
        isInvoiceWithZeroVatRate: false,
        reasonForInvoiceWithZeroVatRate: '',
        paymentMethod: 'Cash',
        bankAccountId: '',
        invoiceLanguage: ''

    })


    //Get Seller company info
    useFetchGet(apiEndpoints.companyInfo, setCompanyInfo, companyInfoGetTriger, setCompanyInfoGetTriger);

    //Get info about client
    useFetchGet((apiEndpoints.clientInfo + `/${invoiceDetails.clientId}`), setClientDetails, invoiceDetails.clientId, setClientInfoGetTriger)

    //Get invoice details
    useFetchGet((apiEndpoints.invoices + `/${invoiceId}`), setInvoiceDetails, invoiceDetailsGetTriger, setInvoiceDetailsGetTriger)

    let sumofArticlesPrice = invoiceDetails.articles
        .reduce((sum, article) => { return sum + (article.quantity * article.unitPrice) }, 0)

    let sumofServicesPrice = invoiceDetails.services
        .reduce((sum, service) => { return sum + (service.quantity * service.price) }, 0)

    let priceWithoutVat = sumofArticlesPrice + sumofServicesPrice;

    let articlesVatValue = invoiceDetails.articles.length === 0 ? 0 : invoiceDetails.articles
        .reduce((sum, article) => { return sum + (article.vatRate / 100 * article.unitPrice * article.quantity) }, 0);


    let serviceVatValue = invoiceDetails.services.length === 0 ? 0 : invoiceDetails.services
        .reduce((sum, service) => { return sum + (service.vatRate / 100 * service.price * service.quantity) }, 0);


    let vatValue = invoiceDetails.isInvoiceWithZeroVatRate ? 0
        :
        articlesVatValue + serviceVatValue;


    useEffect(() => {
        if (clientId) {
            setInvoiceDetails(prevState => ({ ...prevState, clientId: clientId }))
        }
        if (invoiceId) {
            setInvoiceDetailsGetTriger(true)

        }
        else {
            invoiceService.getInvoiceDefaultOptions()
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        console.log(res);
                    }
                    else {
                        setInvoiceDetails(prevState => ({ ...prevState, ...res }))

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }


    }, [])

    function downloadHandler(invoiceId) {
        invoiceService.downloadInvoice(invoiceId)
            .then(res => res.blob())
            .then(res => {
                console.log(invoiceId);
                setLoading(false)
                saveAs(res, invoiceId + '.pdf')
                props.history.push('/Invoices/All')

            })
            .catch(err => {
                console.log(err)
            })
    }
    function saveInvoiceHandler() {
        let errors = validateInvoiceInputModel(invoiceDetails);
        if (errors.length != 0) {

            setNotification({ isOpen: true, message: errors[0], position: 'fixed' })
            window.scrollTo(0, 0)
        }
        else {
            setLoading(true);
            invoiceService.saveInvoice({ ...invoiceDetails })
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        console.log(res);
                    }
                    else {
                        console.log(res)

                        downloadHandler(res.message)

                    }


                })
                .catch(err => {
                    console.log(err);
                })
        }

    }
    function editInvoiceHandler() {

        let errors = validateInvoiceInputModel(invoiceDetails);
        if (errors.length != 0) {
            setNotification({ isOpen: true, message: errors[0], position: 'fixed' })
        }
        else {
            setLoading(true);
            invoiceService.editInvoice({ ...invoiceDetails }, invoiceId)
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        console.log(res);
                    }
                    else {
                        let invoiceId = res.message
                        downloadHandler(invoiceId)


                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function changeBankAccountHandler(event) {
        let value = event.target.value;
        setInvoiceDetails(prevState => ({ ...prevState, bankAccountId: value }))
    }
    function changeInvoiceLanguagehandler(event) {
        let value = event.target.value;
        setInvoiceDetails(prevState => ({ ...prevState, invoiceLanguage: value }))
    }
    const classes = useStyles();
    return (

        <>
            <ProgressIndicator
                isLoading={isLoading}
            />
            <Paper className={classes.main} elevation={5} style={isLoading ? { opacity: '0.7' } : { opacit: '1' }}>
                <div className={classes.title}>
                    {
                        invoiceId ?
                            <h1 >Фактура &#8470; {invoiceDetails.invoiceNumber} </h1>
                            :
                            <h1 >Нова фактура</h1>
                    }

                </div>

                <Grid container alignItems="center">

                    <Grid item md={2}>
                        <CompanyInfoCard
                            setInvoiceDetails={setInvoiceDetails}
                            setClientInfoGetTriger={setClientInfoGetTriger}
                            companyInfo={clientDetails}
                            disableButton={false}
                        >
                            Получател
                        </CompanyInfoCard>

                    </Grid>
                    <Grid item md={6} align="center" >
                        <InvoiceInfo
                            issueDate={invoiceDetails.issueDate}
                            dateOfTaxEvent={invoiceDetails.dateOfTaxEvent}
                            setInvoiceDetails={setInvoiceDetails}
                        ></InvoiceInfo>
                    </Grid>
                    <Grid >
                        <CompanyInfoCard
                            companyInfo={companyInfo}
                            disableButton={true}
                        >
                            Доставчик
                        </CompanyInfoCard>
                    </Grid>
                </Grid>


                <ConfirmedProductsTable
                    setInvoiceDetails={setInvoiceDetails}
                    articles={invoiceDetails.articles}
                    vatValue={vatValue}
                    priceWithoutVat={priceWithoutVat}
                    isInvoiceWithZeroVatRate={invoiceDetails.isInvoiceWithZeroVatRate}
                    services={invoiceDetails.services}
                />



                <ControlMenu
                    reasonForInvoiceWithZeroVatRate={invoiceDetails.reasonForInvoiceWithZeroVatRate}
                    saveInvoiceHandler={saveInvoiceHandler}
                    paymentMethod={invoiceDetails.paymentMethod}
                    paymentPeriod={invoiceDetails.paymentPeriod}
                    isInvoiceWithZeroVatRate={invoiceDetails.isInvoiceWithZeroVatRate}
                    setInvoiceDetails={setInvoiceDetails}
                    editInvoiceHandler={editInvoiceHandler}
                    invoiceId={invoiceId}
                    bankAccountId={invoiceDetails.bankAccountId}
                    changeBankAccountHandler={changeBankAccountHandler}
                    changeInvoiceLanguagehandler={changeInvoiceLanguagehandler}
                    invoiceLanguage={invoiceDetails.invoiceLanguage}
                ></ControlMenu>
            </Paper>
        </>
    );


}

export default NewInvoice