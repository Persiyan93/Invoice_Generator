import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'

import {
    IconButton,
    makeStyles, Button, Table, Grid, InputBase, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import useFetchGet from '../../../hooks/useFetchGet'
import useFetchPut from '../../../hooks/useFetchPut'
import apiEndpoints from '../../../services/apiEndpoints'
import TableWithPagingAndSorting from '../Elements/TableWithPagingAndSorting'
import ConfirmationPopup from '../Popup/ConfirmPopup'
import HistorySearchBar from './HistorySearchBar'
import getResultAfterPagingAndSorting from '../../../services/sortingService';
const headCells = [

    { id: 'fullName', title: "Име на потребителя" },
    { id: 'eventType', title: 'Вид на събитето' },
    { id: 'dateOfEvent', title: 'Дата на събитието' },
    { id: 'message', title: 'Съобщение' },
    { id: 'Action', title: 'Действие', disableSorting: 'true' },

]
var date = new Date();
var initialPeriodOfStatisctic = {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toJSON().slice(0, 10),
    endDate: date.toJSON().slice(0, 10)
}

//const userId= new URLSearchParams(search).get("userId");
//const eventType= new URLSearchParams(search).get("typeOfEvent");
export default function History(props) {
    var search=props.location.search;
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [filterFunction, setFilterFunc] = useState({ fn: (elements) => { return elements } })
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [periodOfStatistic, setPeriodOfStatistic] = useState(initialPeriodOfStatisctic)
    const [selectedUserId, setSelectUserId] = useState('');
    const [eventTypeId, setEventTypeId] = useState('');
    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])

    useEffect(()=>{
        
    },[])

    var getEventsUrl = apiEndpoints.getHistory +
        `?startDate=${periodOfStatistic.startDate}&endDate=${periodOfStatistic.endDate}&` +
        `userId=${selectedUserId}&eventType=${eventTypeId}`
    const [getEventsTriger, setGetEventsTriger] = useState(false)
    useFetchGet(getEventsUrl, setEvents, getEventsTriger, setGetEventsTriger)

    function elementsAfterPagingAndSorting() {
        const { order, orderBy } = pagingAndSorting
        return getResultAfterPagingAndSorting(filterFunction.fn(users), order, orderBy)

    }




    return (
        <>
            <HistorySearchBar
                selectedUser={selectedUserId}
                setSelectUser={setSelectUserId}
                periodOfStatistic={periodOfStatistic}
                setPeriodOfStatistic={setPeriodOfStatistic}
                eventTypeId={eventTypeId}
                setEventTypeId={setEventTypeId}
            >

            </HistorySearchBar>
            <TableWithPagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
            >

                <TableBody>

                    {

                        elementsAfterPagingAndSorting().map((user) => (

                            <TableRow key={user.id}  >
                                <TableCell component="th" scope="row" >
                                    {user.fullName}
                                </TableCell>
                                <TableCell align="right">{user.email} </TableCell>
                                <TableCell align="right">{user.countOfGeneratedInvoice}</TableCell>
                                <TableCell align="right">{user.sumOfAllInvoices}</TableCell>


                                <TableCell align="right">

                                    <Link to="/History" style={{ textDecoration: 'none' }}>
                                        <IconButton size="medium" >
                                            <InfoIcon fontSize="small" />
                                        </IconButton>
                                    </Link>

                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>



            </TableWithPagingAndSorting>

            <ConfirmationPopup
                setOpenPopup={setOpenConfirmationPopup}
                //actionAfterConfirmation
                openPopup={openConfirmationPopup}
                title='Ограничаване на достъпа'

                question={`Сигурни ли сте че искате да ограничите достъпа на  `}
            />
        </>
    )
}

