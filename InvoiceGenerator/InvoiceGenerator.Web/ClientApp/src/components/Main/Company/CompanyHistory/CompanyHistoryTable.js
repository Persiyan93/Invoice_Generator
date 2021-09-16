import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Paper, TableCell, TableRow, TableBody, TablePagination } from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';
import queryString from "query-string";
import useFetchGet from '../../../../hooks/useFetchGet'
import { eventTypeConverter } from '../../../../services/globalServices'
import apiEndpoints from '../../../../services/apiEndpoints'
import TableWithServerSidePagingAndSorting from '../../../Elements/TableWithServerSidePagingAndSorting';
import ConfirmationPopup from '../../../Elements/ConfirmationPopup'
import CompanyHistorySearchBar from './CompanyHistorySearchBar'

const headCells = [

    { id: 'UserName', title: "Име на потребителя", disableSorting: 'true' },
    { id: 'EventType', title: 'Вид на събитето' },
    { id: 'DateOfEvent', title: 'Дата на събитието' },
    { id: 'Message', title: 'Съобщение' },
]

var date = new Date();

var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

const pages = [5, 10, 15]

export default function CompanyHistoryTable(props) {

    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })
    const [periodOfStatistic, setPeriodOfStatistic] = useState(initialPeriodOfStatisctic)
    const [selectedUserId, selectUserId] = useState('All');
    const [eventType, setEventType] = useState('All');
    const [events, setEvents] = useState({ filteredEvents: [], countOfAllEvents: 0 })
    const { filteredEvents, countOfAllEvents } = events


    const { page, rowsPerPage } = paging
    const { order, orderBy } = sorting
    const { startDate, endDate } = periodOfStatistic

    useEffect(() => {
        props.history.replace({
            search: `?${queryString.stringify({
                page: page ? page : undefined,
                rowsPerPage: rowsPerPage === 10 ? undefined : rowsPerPage,
                order: order == 'asc' ? undefined : order,
                orderBy: orderBy ? orderBy : undefined,
                eventType: eventType === 'All' ? undefined : eventType,
                userId: selectedUserId === 'All' ? undefined : selectedUserId,
                startDate: startDate,
                endDate: endDate
            })}`
        })
        setGetEventsTriger(true)
    }, [order, orderBy, page, rowsPerPage, startDate, endDate, selectedUserId, eventType])


    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }))
    }

    function trowsPerPageHandle(event) {
        setPaging(prevState => ({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }))
    }


    //Get events
    const [getEventsTriger, setGetEventsTriger] = useState(false)
    var getEventsUrl = apiEndpoints.getHistory + props.history.location.search
    useFetchGet(getEventsUrl, setEvents, getEventsTriger, setGetEventsTriger)


    return (
        <>
            <CompanyHistorySearchBar
                selectedUser={selectedUserId}
                setSelectUser={selectUserId}
                periodOfStatistic={periodOfStatistic}
                setPeriodOfStatistic={setPeriodOfStatistic}
                eventTypeId={eventType}
                setEventTypeId={setEventType}
            >

            </CompanyHistorySearchBar>
            <TableWithServerSidePagingAndSorting
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
                headCells={headCells}
                isLoading={false}
                tableContainer={Paper}
            >

                <TableBody>

                    {
                        filteredEvents.map((event) => (

                            <TableRow key={event.id}  >
                                <TableCell component="th" scope="row" >
                                    {event.userName}
                                </TableCell>
                                <TableCell align="right">{eventTypeConverter(event.eventType)} </TableCell>
                                <TableCell align="right">{event.dateOfEvent}</TableCell>
                                <TableCell align="right">{event.bulgarianMessage}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>



            </TableWithServerSidePagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={countOfAllEvents}
                onPageChange={handleChangePage}
                onRowsPerPageChange={trowsPerPageHandle}
            />

         
        </>
    )
}

