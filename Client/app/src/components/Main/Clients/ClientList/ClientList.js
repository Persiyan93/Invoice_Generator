import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, Table, Grid, InputBase, Paper, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import useFetchGet from '../../../../hooks/useFetchGet'
import useFetchPut from '../../../../hooks/useFetchPut'
import apiEndpoints from '../../../../services/apiEndpoints'
import ClientRow from './ClientRow'
import TableWithServerSidePagingAndSorting from '../../Elements/TableWithServerSidePagingAndSorting'
import ConfirmationPopup from '../../Popup/ConfirmPopup'
import SearchBar from '../../Elements/SearchBar';
import queryString from "query-string";

const headCells = [
    { id: 1, title: '', disableSorting: 'true' },
    { id: 'Name', title: 'Име на фирмата' },
    { id: 'VatNumber', title: 'ДДС Номер' },
    { id: 'Status', title: 'Статус' },
    { id: 'CountOfInvoices', title: 'Брой на всички фактури' },
    { id: 'CountOfOverdueInvoices', title: 'Брой на просрочени фактури' },
    { id: 'ValueSumOfAllUnPaidInvoices', title: 'Стойност на неплатените фактури' },
    { id: 5, title: 'Действие', disableSorting: 'true' },

]

const pages = [5, 10, 15, 20]
export default function ClientList(props) {
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [filterString, setFilterString] = useState('')
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [clients, setClients] = useState([])
    const [selectedUserId, selectUserId] = useState('');
    const [clientNewStatus, setClientNewStatus] = useState('')


    //Get clients
    const [getClientsTringer, setGetClientsTriger] = useState(true)
    var getClientsUrl = apiEndpoints.allClients + props.history.location.search
    useFetchGet(getClientsUrl, setClients, getClientsTringer, setGetClientsTriger)

    // Update client status
    const [updateClientStatusTriger, setUpdateClientStatusTriger] = useState(false);
    useFetchPut(apiEndpoints.updateClientStatus, updateClientStatusTriger, setUpdateClientStatusTriger, { clientId:selectedUserId, status: clientNewStatus });

    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }))

    }
    function trowsPerPageHandle(event) {
        setPaging(prevState => ({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }))


    }

    function blockClientHandler(e, clientId) {
        selectUserId(clientId);
        setClientNewStatus('Blocked')
        setOpenConfirmationPopup(true)

    }
    function activateClientHandler(e, clientId) {
        selectUserId(clientId);
        setClientNewStatus('Active')
        setUpdateClientStatusTriger(true)
    }



    const { orderBy, order } = pagingAndSorting;
    const { page, rowsPerPage } = paging;
    useEffect(() => {
        props.history.replace({
            search: `?${queryString.stringify({
                page: page ? page : undefined,
                rowsPerPage: rowsPerPage === 10 ? undefined : rowsPerPage,
                order: order == 'asc' ? undefined : order,
                orderBy: orderBy ? orderBy : undefined,
                filterString: filterString ? filterString : undefined


            })}`
        })
        setGetClientsTriger(true)
    }, [order, orderBy, page, rowsPerPage, filterString])

    function searchHandler(event) {
        setFilterString(event.target.value)
    }
    return (
        <>


            <SearchBar
                title="Клиент"
                searchbarLabel="Намери клиент"
                placeholder="Име на клиента"
                searchHandler={searchHandler}
                filterString={filterString}
            />


            <TableWithServerSidePagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
            >

                <TableBody>

                    {clients.map((client) => (
                        <ClientRow
                            key={client.id}
                            {...client}
                            blockClientHandler={blockClientHandler}
                            activateClientHandler={activateClientHandler}
                            align="right"
                        />
                    ))}
                </TableBody>



            </TableWithServerSidePagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={clients.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={trowsPerPageHandle}
            />

            <ConfirmationPopup
                setOpenPopup={setOpenConfirmationPopup}
                actionAfterConfirmation={() => { setUpdateClientStatusTriger(true) }}
                openPopup={openConfirmationPopup}
                title='Блокиране на клиента'
                //disableUserPutTriger={disableUserPutTriger}
                question={`Сигурни ли сте че искате да ограничите продажбите за ${clients.find(x => x.id === selectedUserId)?.name}`}
            />
        </>
    )
}




