import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, Table, Grid, Checkbox, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import queryString from "query-string";
import * as invoiceService from '../../../services/invoiceService'
import InfoIcon from '@material-ui/icons/Info';
import { saveAs } from 'file-saver';
import apiEndpoints from '../../../services/apiEndpoints'
import useFetchPost from '../../../hooks/useFetchPost';
import { currencyFormater, invoiceStatusConverter } from '../../../services/globalServices'
import TableWithServerSidePagingAndSorting from '../Elements/TableWithServerSidePagingAndSorting'
import Popup from '../Popup';
import InvoiceHistory from './InvoiceHistory';
import InvoicePreview from '../InvoicePreview/InvoicePreview';


const headCells = [
    { id: 'checkBox', disableSorting: 'true' },
    { id: 'InvoiceNumber', title: "Фактура" },
    { id: 'IssueDate', title: 'Дата на издаване' },
    { id: 'PaymentDueDate', title: 'Дата на падеж' },
    { id: 'PriceWithVat', title: 'Стойност с ДДС' },
    { id: 'ClientName', title: 'Име на клиента' },
    { id: 'Status', title: 'Статус', disableSorting: 'true' },
    { id: 'action', title: 'Действие', disableSorting: 'true' },
]
var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}
const pages = [5, 10, 15, 20]
export default function InvoiceList(props) {
    const { invoices, filterString, history, setGetInvoicesTriger, periodOfStatistic = initialPeriodOfStatisctic } = props
    
    const { startDate, endDate } = periodOfStatistic

    //States Related with Paging and sorting
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })


    const [isLoading, setIsLoading] = useState(false);
    const [isInvoicePreviewOpen, openInvoicePreview] = useState(false);
    const [previewInvoiceId, setPrevieInvoiceId] = useState('')
    const [updateStatusOfInvoiceTriger, setUpdateStatusOfInvoiceTriger] = useState(false);
    const [isOpenInvoiceHistoryPopUp, setOpenInvoiceHistoryPopup] = useState(false);
    const [selectedInvoiceId, selectInvoiceId] = useState('')

    const [selectedInvoices, selectInvoices] = useState([])


    const { orderBy, order } = pagingAndSorting;
    const { page, rowsPerPage } = paging;
    useEffect(() => {

        history.replace({
            search: `?${queryString.stringify({
                page: page != 0 ? page : undefined,
                rowsPerPage: rowsPerPage === 10 ? undefined : rowsPerPage,
                order: order == 'asc' ? undefined : order,
                orderBy: orderBy ? orderBy : undefined,
                startDate: startDate,
                endDate: endDate,
                filterString: filterString ? filterString : undefined
            })}`
        })
        setGetInvoicesTriger(true)
    }, [order, orderBy, page, rowsPerPage, filterString, startDate, endDate])


    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }))

    }
    function trowsPerPageHandle(event) {
        setPaging({ page: 0, rowsPerPage: parseInt(event.target.value, 10) })


    }
    function changeStatusOfInvoiceAsPaid(event) {
        setUpdateStatusOfInvoiceTriger(true)
        // setGetInvoicesTriger(true)

    }


    useFetchPost(apiEndpoints.updateInvoiceStatus, { invoiceIds: [...selectedInvoices], status: 'Paid' }, updateStatusOfInvoiceTriger, setUpdateStatusOfInvoiceTriger)


    function downloadHandler(e, invoiceId) {
        setIsLoading(true);
        invoiceService.downloadInvoice(invoiceId)
            .then(res => res.blob())
            .then(res => {
                setIsLoading(false)
                saveAs(res, invoiceId + '.pdf')


            })
            .catch(err => {
                props.history.push('/Errors/ConnectionError')
            })
    }
  
    function selectInvoiceHandler(event, invoiceId) {

        let isInvoiceAlreadySelected = selectedInvoices.some(x => x === invoiceId);
        if (isInvoiceAlreadySelected) {
            selectInvoices(prevState => ([...prevState.filter(x => x != invoiceId)]))
        }
        else {
            console.log('add invoice')
            selectInvoices(prevState => ([...prevState, invoiceId]))
        }
        console.log(selectedInvoices)
    }
    function editInvoiceHandler(e, invoiceId) {
        props.history.push(`/Invoices/Edit/${invoiceId}`)
    }
    function previewInvoiceHandler(e, invoiceId) {
        setPrevieInvoiceId(invoiceId)
        openInvoicePreview(true)
    }
    function openInvoiceHistoryPopupHandler(e, invoiceId) {
        setOpenInvoiceHistoryPopup(true)
        selectInvoiceId(invoiceId)
    }







    return (
        <>




            <TableWithServerSidePagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
                tableContainer={props.tableContainer}
            >

                <TableBody>

                    {invoices.filteredInvoice.map((invoice) => (
                        <TableRow key={invoice.id}  >

                            <TableCell component="th" scope="row">

                                {
                                    invoice.status != 'Paid' &&
                                    <Checkbox
                                        id={invoice.id}
                                        checked={selectedInvoices.some(x => x === invoice.id)}
                                        // {productsFromRightTable.some(x => x.id == article.id) || article.quantity == 0
                                        disabled={invoice.status === 'Locked'}
                                        color="primary"
                                        size="small"
                                        onChange={(e) => { selectInvoiceHandler(e, invoice.id) }}

                                    />

                                }
                            </TableCell>
                            <TableCell >
                                {invoice.invoiceNumber}
                            </TableCell>
                            <TableCell align="right">{invoice.issueDate} г.</TableCell>
                            <TableCell align="right">{invoice.paymentDueDate} г.</TableCell>
                            <TableCell align="right">{currencyFormater(invoice.priceWithVat)}</TableCell>
                            <TableCell align="right">{invoice.clientName}</TableCell>
                            <TableCell align="right">{invoiceStatusConverter(invoice.status)}</TableCell>




                            <TableCell align="right">
                                <IconButton size="medium" disabled={invoice.status == 'Locked'} onClick={(e) => { downloadHandler(e, invoice.id) }}>
                                    <SaveAltIcon fontSize="small" htmlColor='black' />
                                </IconButton>
                                <IconButton size="medium" disabled={invoice.status == 'Locked'} title='Преглед на фактурата'onClick={(e) => { previewInvoiceHandler(e, invoice.id) }}>
                                    <VisibilityIcon fontSize="small" htmlColor={invoice.stats != 'Locked' && 'black'} />
                                </IconButton>
                                {
                                    invoice.status != 'Paid' &&
                                    <IconButton size="medium" disabled={invoice.status == 'Locked'} onClick={(e) => { editInvoiceHandler(e, invoice.id) }}>
                                        <EditIcon fontSize="small" htmlColor={invoice.stats != 'Locked' && 'black'} />
                                    </IconButton>
                                }

                                <IconButton size="medium" onClick={(e) => openInvoiceHistoryPopupHandler(e, invoice.id)} >
                                    <InfoIcon fontSize="small" htmlColor='black' />
                                </IconButton>

                            </TableCell>








                        </TableRow>

                    ))}
                    <TableRow>
                        <TableCell colSpan={8} align="right">
                            <Button size="medium" color='primary' disabled={selectedInvoices.length === 0} variant='outlined' onClick={changeStatusOfInvoiceAsPaid}  >

                                Маркирай като платена
                            </Button>
                        </TableCell>

                    </TableRow>

                </TableBody>



            </TableWithServerSidePagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={invoices ? invoices.countOfAllInvoices : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={trowsPerPageHandle}
            />



            <Popup
                setOpenPopup={setOpenInvoiceHistoryPopup}
                openPopup={isOpenInvoiceHistoryPopUp}
                title='История на фактурата'
                width='xl'
            //icon={<PermIdentityIcon color="default" size="large" />}
            >


                <InvoiceHistory
                    invoiceId={selectedInvoiceId}

                >

                </InvoiceHistory>

            </Popup>

            <InvoicePreview
                isInvoicePreviewOpen={isInvoicePreviewOpen}
                openInvoicePreview={openInvoicePreview}
                invoiceId={previewInvoiceId}
            ></InvoicePreview>



        </>
    )
}
