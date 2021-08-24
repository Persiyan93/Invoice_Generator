import { useEffect, useState, useContext } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core/';
import CompanyInfoCard from './CompanyInfoCard';
import InvoiceInfo from './InvoiceInfo';
import ConfirmedArticlesInInvoice from './ConfirmedArticlesInInvoice';
import ControlMenu from './ControlMenu';
import useFetchGet from '../../../hooks/useFetchGet'
import useFetchPost from '../../../hooks/useFetchPost'
import * as invoiceService from '../../../services/invoiceService'
import apiEndpoints from '../../../services/apiEndpoints'
import { getIdFromResponse } from '../../../services/globalServices'
import { validateInvoiceInputModel } from '../../../services/validationService'
import NotificationContext from '../../../Context/NotificationContext'
import queryString from "query-string";
import ProgressIndicator from '../ProgressIndicator'
import { saveAs } from 'file-saver';





import React from 'react';
const useStyles = makeStyles(theme => ({
    title: {
        display: 'inline',
        textAlign: 'center'

    },
    main: {
        margin: theme.spacing(4),
        //width: '100%',
        borderRadius: 15,
        backgroundColor: '#F2F5FD',


    }
}))

const dateToday = new Date().toJSON().slice(0, 10)
const NewInvoice = (props) => {

    const { setNotification } = useContext(NotificationContext)
    const [isLoading,setLoading]=useState(false);
    const invoiceId = props.match.params['invoiceId'];
    const queryParameters = queryString.parse(props.location.search);
    const clientId = queryParameters.clientId
    const [invoiceDownloadUrl,setInvoiceDownloadUrl]=useState('');
    const [companyInfoGetTriger, setCompanyInfoGetTriger] = useState(true)
    const [clientInfoGetTriger, setClientInfoGetTriger] = useState(false)
    const [invoiceDetailsGetTriger, setInvoiceDetailsGetTriger] = useState(false);
    const [invoiceStatusPostTriger, setInvoiceStatusPostTriger] = useState(false)
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

    })


  
    useFetchGet(apiEndpoints.companyInfo, setCompanyInfo, companyInfoGetTriger, setCompanyInfoGetTriger);
    useFetchGet((apiEndpoints.clientInfo + `/${invoiceDetails.clientId}`), setClientDetails, invoiceDetails.clientId, setClientInfoGetTriger)
    useFetchGet((apiEndpoints.invoices + `/${invoiceId}`), setInvoiceDetails, invoiceDetailsGetTriger, setInvoiceDetailsGetTriger)
    useFetchPost(apiEndpoints.updateInvoiceStatus, { invoiceIds: [invoiceId], status: 'Locked' }, invoiceStatusPostTriger, setInvoiceStatusPostTriger)



    
    let sumofArticlesPrice = invoiceDetails.articles
        .reduce((sum, article) => { return sum + (article.quantity * article.unitPrice) }, 0)

    let sumofServicesPrice = invoiceDetails.services
        .reduce((sum, service) => { return sum + (service.quantity * service.price) }, 0)

    let priceWithoutVat = sumofArticlesPrice + sumofServicesPrice;

    let articlesVatRate = invoiceDetails.articles.length == 0 ? 0 : invoiceDetails.articles
        .reduce((sum, article) => { return sum + article.vatRate }, 0) / (invoiceDetails.articles.length) / 100;


    let servicesVatRate = invoiceDetails.services.length == 0 ? 0 : invoiceDetails.services
        .reduce((sum, service) => { return sum + service.vatRate }, 0) / (invoiceDetails.services.length) / 100;


    let vatValue = invoiceDetails.isInvoiceWithZeroVatRate ? 0
        :
        (articlesVatRate + servicesVatRate)/2 * priceWithoutVat

      
    useEffect(() => {
        if (clientId) {
            setInvoiceDetails(prevState => ({ ...prevState, clientId: clientId }))
        }
        if (invoiceId) {

            setInvoiceStatusPostTriger(true)
            setInvoiceDetailsGetTriger(true)
            return () => {
                invoiceService.updateInvoiceStatus(invoiceId, 'WaitingForPayment')
                    .then(res => res.json())
                    .then(res => {
                        if (res.status == "Unsuccessful") {
                            console.log('Unsuccessful status ')
                            console.log(res);
                        }
                        else {
                            console.log(res)
                        }

                    })
                    .catch(err => {
                        props.history.push('/Errors/ConnectionError')
                    })


            }
        }
    }, [])

    function downloadHandler( invoiceId) {
        
        invoiceService.downloadInvoice(invoiceId)
            .then(res => res.blob())
            .then(res => {
                setLoading(false)
                saveAs(res, invoiceId + '.pdf')
                props.history.push('/Invoices/All')

            })
            .catch(err => {
                props.history.push('/Errors/ConnectionError')
            })
    }
    function saveInvoiceHandler() {
        setLoading(true);
        let errors = validateInvoiceInputModel(invoiceDetails);
        if (errors.length != 0) {
            setNotification({ isOpen: true, message:errors[0],position:'fixed' })
        }
        else {
            invoiceService.saveInvoice({ ...invoiceDetails })
                .then(res => res.json())
                .then(res => {
                    if (res.status == "Unsuccessful") {
                        console.log(res);
                    }
                    else {
                        let invoiceId=getIdFromResponse(res.message)
                        downloadHandler(invoiceId)

                    }


                })
                .catch(err => {
                console.log(err);
                })
        }

    }
    function editInvoiceHandler() {
        setLoading(true);
        invoiceService.editInvoice({ ...invoiceDetails }, invoiceId)
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log(res);
                }
                else {
                    let invoiceId=getIdFromResponse(res.message)
                        downloadHandler(invoiceId)
                    

                }


            })
            .catch(err => {
               console.log(err)
            })
    }

    
    const classes = useStyles();
    return (

        <React.Fragment>


            <ProgressIndicator
            isLoading={isLoading}
            />
            <Paper className={classes.main} elevation={5} style={isLoading?{opacity:'0.7'}:{opacit:'1'}}>
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


                <ConfirmedArticlesInInvoice
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
                ></ControlMenu>
            </Paper>
        </React.Fragment>
    );


}

export default NewInvoice