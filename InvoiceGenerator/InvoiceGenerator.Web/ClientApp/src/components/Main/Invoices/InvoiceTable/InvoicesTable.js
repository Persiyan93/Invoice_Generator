import { useState, useEffect, } from 'react'

import { Paper } from '@material-ui/core/';
import queryString from "query-string";
import useFetchGet from '../../../../hooks/useFetchGet'
import ListWithInvoices from './ListWithInvoices';
import apiEndpoints from '../../../../services/apiEndpoints'
import InvoiceSearchBar from './InvoiceSearchbar/InvoiceSearchBar'





var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

const initialSearchParameters = {
    invoiceNumber: '',
    dateFrom: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    dateTo: date.toJSON().slice(0, 10),
    invoiceStatus: 'All',
    clientName: '',
    createdBy: 'All',
    orderBy: 'IssueDate',
    order: 'asc'
}
const initialValuesOfInvoices = {
    filteredInvoice: [],
    countOfAllInvoices: 0
}

export default function InvoicesTable(props) {
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [invoices, setInvoices] = useState(initialValuesOfInvoices);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters)

    useEffect(() => {
        changeSearchParameters()
    }, [paging])

    function changePageHandler(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }))
    }

    function changeRowsPerPageHandler(event) {
        setPaging(prevState => ({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }))
    }

    function changeSearchParametersHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        setSearchParameters(prevState => ({ ...prevState, [name]: value }))
    }

    function pressSurchButtonHandler(e) {
        e.preventDefault()
        changeSearchParameters()
    }

    function changeSearchParameters() {
        setIsLoading(true)
        window.scrollTo(0, 0)
        const { page, rowsPerPage } = paging
        const { invoiceNumber, dateFrom, dateTo, invoiceStatus, clientName, createdBy, order, orderBy } = searchParameters
        props.history.replace({
            search: `?${queryString.stringify({
                page: page != 0 ? page : undefined,
                rowsPerPage: rowsPerPage === 10 ? undefined : rowsPerPage,
                startDate: dateFrom,
                endDate: dateTo,
                clientName: clientName ? clientName : undefined,
                invoiceNumber: invoiceNumber ? invoiceNumber : undefined,
                invoiceStatus: invoiceStatus != 'All' ? invoiceStatus : undefined,
                createdBy: createdBy != 'All' ? createdBy : undefined,
                order: order == 'asc' ? undefined : order,
                orderBy: orderBy!='IssueDate' ? orderBy : undefined,
            })}`
        })
        setGetInvoicesTriger(true)
      
    }

    function actionAfterSuccessfullyGetedInvoices() {
        setIsLoading(false)
    }
    function updateInvoicesList() {
        setGetInvoicesTriger(true)
    }

    //Get Invoices
    const [getInvoicesTriger, setGetInvoicesTriger] = useState(true);
    
    let getInvoicesUrl = apiEndpoints.invoices + (props.history.location.search == '' ? `?endDate=${initialPeriodOfStatisctic.endDate}&startDate=${initialPeriodOfStatisctic.startDate}`: props.history.location.search);
    useFetchGet(getInvoicesUrl, setInvoices, getInvoicesTriger, setGetInvoicesTriger, actionAfterSuccessfullyGetedInvoices);


    const tableContainer = Paper;
    return (
        <>
            <InvoiceSearchBar
                searchParameters={searchParameters}
                changeSearchParametersHandler={changeSearchParametersHandler}
                pressSurchButtonHandler={pressSurchButtonHandler}
            />



            <ListWithInvoices
                invoices={invoices}
                changePageHandler={changePageHandler}
                changeRowsPerPageHandler={changeRowsPerPageHandler}
                paging={paging}
                history={props.history}
                tableContainer={tableContainer}
                isLoading={isLoading}
                updateInvoicesList={ updateInvoicesList}
            >

            </ListWithInvoices>

        </>
    )
}

