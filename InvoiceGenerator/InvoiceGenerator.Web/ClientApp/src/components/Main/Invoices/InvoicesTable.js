import { useState } from 'react'
import { Paper } from '@material-ui/core/';
import useFetchGet from '../../../hooks/useFetchGet'
import ListWithInvoices from './ListWithInvoices';
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
            <ListWithInvoices
                invoices={invoices}
                history={props.history}
                setGetInvoicesTriger={setGetInvoicesTriger}
                periodOfStatistic={periodOfStatistic}
                filterString={filterString}
                tableContainer={tableContainer}
            >

            </ListWithInvoices>

        </>
    )
}
