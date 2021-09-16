import { useEffect, useState, } from 'react'
import { Paper, TableBody, TablePagination } from '@material-ui/core/';
import queryString from "query-string";
import useFetchGet from '../../../../hooks/useFetchGet'
import useFetchPut from '../../../../hooks/useFetchPut'
import apiEndpoints from '../../../../services/apiEndpoints'
import ClientRow from './ClientRow'
import TableWithServerSidePagingAndSorting from '../../../Elements/TableWithServerSidePagingAndSorting'
import ConfirmationPopup from '../../../Elements/ConfirmationPopup'
import SearchBar from '../../../Elements/SearchBar';
import EmptyTableBody from '../../../Elements/EmptyTableBody'

const headCells = [
    { id: 1, title: '', disableSorting: 'true' },
    { id: 'Name', title: 'Име на фирмата' },
    { id: 'VatNumber', title: 'ДДС Номер' },
    { id: 'Status', title: 'Статус' },
    { id: 'CountOfUnPaidInvoices', title: 'Брой на неплатените фактури' },
    { id: 'ValueSumOfAllUnPaidInvoices', title: 'Стойност на неплатените фактури' },
    { id: 'CountOfOverdueInvoices', title: 'Брой на просрочени фактури' },
    { id: 'PriceOfAllOverdueInvoices', title: 'Стойност на просрочените фактури' },
    { id: 5, title: 'Действие', disableSorting: 'true' },

]

const pages = [5, 10, 15, 20]
export default function ClientList(props) {
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [filterString, setFilterString] = useState('')
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [clients, setClients] = useState({ filteredClients: [], countOfClients: 0 })
    const [selectedUserId, selectUserId] = useState('');
    const [clientNewStatus, setClientNewStatus] = useState('')


    //Get clients
    const [getClientsTringer, setGetClientsTriger] = useState(true)
    var getClientsUrl = apiEndpoints.allClients + props.history.location.search
    useFetchGet(getClientsUrl, setClients, getClientsTringer, setGetClientsTriger)

    // Update client status
    const [updateClientStatusTriger, setUpdateClientStatusTriger] = useState(false);
    useFetchPut(apiEndpoints.updateClientStatus,
        updateClientStatusTriger,
        setUpdateClientStatusTriger,
        { clientId: selectedUserId, status: clientNewStatus },
        actionAfterSuccessfullUpdatedStatusOfClient
    );

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
    function actionAfterSuccessfullUpdatedStatusOfClient() {
        setGetClientsTriger(true);
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
    const { filteredClients, countOfClients } = clients;
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
                tableContainer={Paper}
            >

                <TableBody>
                    <>

                        {
                            filteredClients.length !== 0 ?
                                (
                                    filteredClients.map((client) => (
                                        <ClientRow
                                            key={client.id}
                                            {...client}
                                            blockClientHandler={blockClientHandler}
                                            activateClientHandler={activateClientHandler}
                                            align="right"
                                        />
                                    ))
                                )

                                :
                                (

                                    <EmptyTableBody
                                        rowText="Все още няма добавени клиенти"
                                        button={{ title: 'Добави клиент', clickHandler: () => (props.history.push('/Clients/NewClient')) }}
                                        countOfColumns={9}
                                    />


                                )
                        }
                    </>

                </TableBody>



            </TableWithServerSidePagingAndSorting>
            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={countOfClients}
                onPageChange={handleChangePage}
                onRowsPerPageChange={trowsPerPageHandle}
            />

            <ConfirmationPopup
                setOpenPopup={setOpenConfirmationPopup}
                actionAfterConfirmation={() => { setUpdateClientStatusTriger(true) }}
                openPopup={openConfirmationPopup}
                title='Блокиране на клиента'
                question={`Сигурни ли сте че искате да ограничите продажбите за ${filteredClients.find(x => x.id === selectedUserId)?.name}`}
            />
        </>
    )
}




