import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, Table, Grid, InputBase, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import useFetchGet from '../../../../hooks/useFetchGet'
import InvoiceList from '../../InvoiceList/InvoiceList';
import apiEndpoints from '../../../../services/apiEndpoints'
import InvoiceSearchBar from '../../InvoiceList/InvoiceSearchBar';





var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

export default function ClientInvoices(props) {
    const {clientId,history} =props
    const [invoices, setInvoices] = useState({filteredInvoice:[],counOfAllInvoices:0});
    const [periodOfStatistic, setPeriodOfStatistic] = useState(initialPeriodOfStatisctic)
    const [filterString, setFilterString] = useState('');
    
  
    
    props.history.location.search=`?startDate=${initialPeriodOfStatisctic.startDate}&endDate=${initialPeriodOfStatisctic.endDate}`;


    //Get Invoices
    const [getInvoicesTriger, setGetInvoicesTriger] = useState(true);
    let getclientInvoicesUrl = apiEndpoints.getClientInvoices +`/${clientId}`+  history.location.search;
    useFetchGet(getclientInvoicesUrl, setInvoices, getInvoicesTriger, setGetInvoicesTriger);


    return (
        <>

            <InvoiceSearchBar
             setInvoicesGetTriger={setGetInvoicesTriger}
             history={props.history}
             periodOfStatistic={periodOfStatistic}
             setPeriodOfStatistic={setPeriodOfStatistic}
             filterString={filterString}
             setFilterString={setFilterString}
            >
            </InvoiceSearchBar>
            <InvoiceList
                invoices={invoices}
                history={props.history}
                setGetInvoicesTriger={setGetInvoicesTriger}
                periodOfStatistic={periodOfStatistic}
                filterString={filterString}
            >

            </InvoiceList>







        </>
    )
}
