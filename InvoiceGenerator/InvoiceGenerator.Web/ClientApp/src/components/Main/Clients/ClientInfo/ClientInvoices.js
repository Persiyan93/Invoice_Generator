import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, Table, Grid, InputBase, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';

import useFetchGet from '../../../../hooks/useFetchGet'

import apiEndpoints from '../../../../services/apiEndpoints'
import InvoicesTable from '../../Invoices/InvoiceTable/InvoicesTable'



export default function ClientInvoices(props) {
    const { clientId, history } = props
    const [invoices, setInvoices] = useState({ filteredInvoice: [], counOfAllInvoices: 0 });

    return (
        <>
            <InvoicesTable />








        </>
    )
}
