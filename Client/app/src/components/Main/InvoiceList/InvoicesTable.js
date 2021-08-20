import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, Table, Grid, InputBase, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import useFetchGet from '../../../hooks/useFetchGet'
import InvoiceList from './InvoiceList';

import apiEndpoints from '../../../services/apiEndpoints'
import InvoiceSearchBar from './InvoiceSearchBar';





var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

export default function InvoicesTable(props) {
    const [invoices, setInvoices] = useState({ filteredInvoice: [], counOfAllInvoices: 0 });
    const [periodOfStatistic, setPeriodOfStatistic] = useState(initialPeriodOfStatisctic)
    const [filterString, setFilterString] = useState('');

    useState(() => {
        props.history.location.search = `?startDate=${initialPeriodOfStatisctic.startDate}&endDate=${initialPeriodOfStatisctic.endDate}`;
    }, [])




    //Get Invoices
    const [getInvoicesTriger, setGetInvoicesTriger] = useState(true);
    let getInvoicesUrl = apiEndpoints.invoices + props.history.location.search;
    console.log(getInvoicesUrl);
    useFetchGet(getInvoicesUrl, setInvoices, getInvoicesTriger, setGetInvoicesTriger);


    const tableContainer = Paper;
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
                tableContainer={tableContainer}
            >

            </InvoiceList>







        </>
    )
}
