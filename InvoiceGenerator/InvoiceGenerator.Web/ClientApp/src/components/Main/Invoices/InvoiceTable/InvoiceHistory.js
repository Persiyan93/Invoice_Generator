import { useState } from 'react';
import { Paper, makeStyles, TableRow, TableBody, TableCell, TablePagination} from '@material-ui/core'
import getResultAfterPagingAndSorting from '../../../../services/sortingService';
import TableWithPagingAndSorting from '../../../Elements/TableWithPagingAndSorting';
import apiEndpoints from '../../../../services/apiEndpoints';
import useFetchGet from '../../../../hooks/useFetchGet';
import { eventTypeConverter } from '../../../../services/globalServices'


const useStyles = makeStyles(theme => ({

    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    button: {
        marginBottom: '2px',
        marginLeft: '90%'
    }


}))

const headCells = [

    { id: 'UserName', title: 'Име на потребителя' },
    { id: 'eventType', title: 'Вид на събитието' },
    { id: 'dataOfEvent', title: 'Дата на събитието', disableSorting: 'true' },
    { id: 'message', title: 'Допълнителан информация' },

]
const pages = [5, 10, 15]
export default function InvoiceHistory(props) {
    const { invoiceId } = props
    const [invoiceEvents, setInvoiceEvents] = useState([])
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 5 })
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })

    //GetInvoiceEvents
    const [getInvoiceEventsTriger, setInvoiceEventsGetTriger] = useState(true);
    var getInvoiceEventsUrl = apiEndpoints.getInvoiHistory + `/${invoiceId}`;
    useFetchGet(getInvoiceEventsUrl, setInvoiceEvents, getInvoiceEventsTriger, setInvoiceEventsGetTriger)

    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }));

    }
    function rowsPerPageHandler(event) {
        setPaging({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

    }

    function eventsAfterPagingAndSorting(event) {
        const { order, orderBy } = sorting
        const { page, rowsPerPage } = paging
        return getResultAfterPagingAndSorting(invoiceEvents, order, orderBy)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const classes = useStyles();
 
    return (

        <Paper className={classes.pageContent}>
            <TableWithPagingAndSorting
                headCells={headCells}
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
            ><TableBody>
                    {
                        eventsAfterPagingAndSorting().map((event) => (
                            <TableRow key={event.id}>


                                <TableCell >
                                    {event.userName}
                                </TableCell>
                                <TableCell >
                                    {eventTypeConverter(event.eventType)}
                                </TableCell>
                                <TableCell>
                                    {event.dateOfEvent}
                                </TableCell>
                                <TableCell>
                                    {event.bulgarianMessage}
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>



            </TableWithPagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={invoiceEvents.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={rowsPerPageHandler}
            />
        </Paper>
    )
}
