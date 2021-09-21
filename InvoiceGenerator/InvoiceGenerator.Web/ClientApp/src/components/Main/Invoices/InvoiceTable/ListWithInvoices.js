import { useEffect, useState, } from 'react'
import { IconButton, Button, Checkbox, TableCell, TableRow, TableBody, TablePagination } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { saveAs } from 'file-saver';
import * as invoiceService from '../../../../services/invoiceService'
import InfoIcon from '@material-ui/icons/Info';
import apiEndpoints from '../../../../services/apiEndpoints'
import useFetchPost from '../../../../hooks/useFetchPost';
import { currencyFormater, invoiceStatusConverter } from '../../../../services/globalServices'
import Popup from '../../../Elements/Popup';
import InvoicesTableHead from './InvoicesTableHead'
import InvoiceHistory from './InvoiceHistory';
import InvoicePreview from '../InvoicePreview/InvoicePreview';


const headCells = [
    { id: 'checkBox', disableSorting: 'true' },
    { id: 'InvoiceNumber', title: "Фактура &#8470;" },
    { id: 'IssueDate', title: 'Дата на издаване' },
    { id: 'PaymentDueDate', title: 'Дата на падеж' },
    { id: 'PriceWithVat', title: 'Стойност с ДДС' },
    { id: 'ClientName', title: 'Име на клиента' },
    { id: 'Status', title: 'Статус', disableSorting: 'true' },
    { id: 'action', title: 'Действие', disableSorting: 'true' },
]


const rows = [5, 10, 15, 20]
export default function ListWithInvoices(props) {
    const { invoices, changePageHandler, paging, changeRowsPerPageHandler, isLoading, updateInvoicesList } = props
    const [isInvoicePreviewOpen, openInvoicePreview] = useState(false);
    const [previewInvoiceId, setPrevieInvoiceId] = useState('')
    const [updateStatusOfInvoiceTriger, setUpdateStatusOfInvoiceTriger] = useState(false);
    const [isOpenInvoiceHistoryPopUp, setOpenInvoiceHistoryPopup] = useState(false);
    const [selectedInvoiceId, selectInvoiceId] = useState('')
    const [selectedInvoices, selectInvoices] = useState([])


    function changeStatusOfInvoiceAsPaid(event) {
        setUpdateStatusOfInvoiceTriger(true)
    }

    function actionAfterSuccessfullyUpdetedStatusOfInvoice() {
        updateInvoicesList()
    }
    useFetchPost(apiEndpoints.updateInvoiceStatus, { invoiceIds: [...selectedInvoices], status: 'Paid' }, updateStatusOfInvoiceTriger, setUpdateStatusOfInvoiceTriger, actionAfterSuccessfullyUpdetedStatusOfInvoice)


    function downloadHandler(e, invoiceId) {
        invoiceService.downloadInvoice(invoiceId)
            .then(res => res.blob())
            .then(res => {
                saveAs(res, invoiceId + '.pdf')
                props.history.push('/Invoices/All')

            })
            .catch(err => {
                console.log(err)
            })

    }

    function selectInvoiceHandler(event, invoiceId) {
        let isInvoiceAlreadySelected = selectedInvoices.some(x => x === invoiceId);
        if (isInvoiceAlreadySelected) {
            selectInvoices(prevState => ([...prevState.filter(x => x != invoiceId)]))
        }
        else {
            selectInvoices(prevState => ([...prevState, invoiceId]))
        }
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
            
            <InvoicesTableHead
                 headCells={headCells}
                isLoading={isLoading}
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
                                <IconButton size="medium" disabled={invoice.status == 'Locked'} title='Преглед на фактурата' onClick={(e) => { previewInvoiceHandler(e, invoice.id) }}>
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



            </InvoicesTableHead>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={rows}
                rowsPerPage={paging.rowsPerPage}
                count={invoices.countOfAllInvoices}
                onPageChange={changePageHandler}
                onRowsPerPageChange={changeRowsPerPageHandler }
            />



            <Popup
                setOpenPopup={setOpenInvoiceHistoryPopup}
                openPopup={isOpenInvoiceHistoryPopUp}
                title='История на фактурата'
                width='xl'
            >
                <InvoiceHistory invoiceId={selectedInvoiceId} />
            </Popup>

            <InvoicePreview
                isInvoicePreviewOpen={isInvoicePreviewOpen}
                openInvoicePreview={openInvoicePreview}
                invoiceId={previewInvoiceId}
            />
        </>
    )
}
