import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles, Paper, TablePagination,  Button,  TableRow, TableBody, TableCell,   Checkbox } from '@material-ui/core';


import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';
import Popup from '../../../Elements/Popup';
/*import AddClientForm from '../Clients/AddClient/AddClient';*/
import queryString from "query-string";
import SearchBar from '../../../Elements/SearchBar';
import TableWithServerSidePagingAndSorting from '../../../Elements/TableWithServerSidePagingAndSorting';
import { convertCompanyName, currencyFormater, clientStatusFormater } from '../../../../services/globalServices'

const useStyles = makeStyles({

    title: {
        fontSize: 20,
    },
    root: {
        // width: '90%',
        // display: 'block',
        // alignItems: 'center',
        // margin: 60,
        // marginBottom: 40,
        // // pading: '0 15px',
        // borderRadius: 10,
        // background: '#E6EAE9'
        cursor: 'pointer'




    },
    selected: {
        cursor: 'pointer'
    },
    body: {
        '& .MuiTableRow-root': {
            cursor: 'pointer'

        },

    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})

const headCells = [

    { id: 'selector', title: '', disableSorting: 'true' },
    { id: 'Name', title: 'Име на фирмата' },
    { id: 'VatNumber', title: 'ДДС Номер' },
    { id: 'Status', title: 'Статус' },
    { id: 'CountOfUnPaidInvoices', title: 'Брой на неплатените фактури' },
    { id: 'ValueSumOfAllUnPaidInvoices', title: 'Стойност на неплатените фактури' },
    { id: 'CountOfOverdueInvoices', title: 'Брой на просрочени фактури' },
    { id: 'PriceOfAllOverdueInvoices', title: 'Стойност на просрочените фактури' },

]
const pages = [5, 10]
export default function ClientListInInvoice(props) {
    const history = useHistory();
    //States related with paging and sorting 

    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [filterString, setFilterString] = useState('')
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })
    const [isLoading, setIsLoading] = useState(false);



    const [isOpenPopup, setOpenPopup] = useState(false);
    const [clients, setClients] = useState({ filteredClients: [], countOfClients: 0 })
    const [isClientSelected, selectClient] = useState(false);
    const [clientId, setClientId] = useState('')


    //Get Clients
    const [getClientsTringer, setGetClientsTriger] = useState(true)
    var getClientsUrl = apiEndpoints.allClients + history.location.search
    useFetchGet(getClientsUrl, setClients, getClientsTringer, setGetClientsTriger)




    //Functions rlated with paging and sorting
    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }));

    }
    function rowsPerPageHandler(event) {
        setPaging({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

    }
    const { orderBy, order } = pagingAndSorting;
    const { page, rowsPerPage } = paging;
    useEffect(() => {
        history.replace({
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



    function changeHandler(event) {

        if (isClientSelected) {
            selectClient(false)
            setClientId('')
        }
        else {
            let clientId = event.target.id
            selectClient(true)
            setClientId(clientId)
        }
    }

    function confirmClientHandler(event) {

        props.setInvoiceDetails(prevState => ({ ...prevState, clientId: clientId }))
        props.setOpenPopup(false)
        props.setClientInfoGetTriger(true);

    }

    const { filteredClients, countOfClients } = clients

    const classes = useStyles();
    return (
        <>


            <SearchBar
                title='Клиент'
                searchbarLabel='Намери Клиент'
                placeholder='Име на клиента или ДДС номер'
                filterString={filterString}

            />



            <TableWithServerSidePagingAndSorting
                pagingAndSorting={pagingAndSorting}
                setPagingAndSorting={setPagingAndSorting}
                headCells={headCells}
                isLoading={false}
                tableContainer={Paper}

            >

                <TableBody className={classes.body}>
                    {

                        filteredClients.map((client) => (

                            < TableRow key={client.id} hover={true} className={classes.row}>
                                {
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        <Checkbox
                                            id={client.id}
                                            disabled={(!(!isClientSelected || (clientId === client.id)) || client.status === 'Blocked')}
                                            // disabled={(!(!isClientSelected || (clientId === client.id) )|| client.statys === 'Blocked')}
                                            color="primary"
                                            onChange={changeHandler}

                                        />
                                    </TableCell>
                                }



                                <TableCell component="th" scope="row">
                                    {convertCompanyName({ ...client })}
                                </TableCell>

                                <TableCell align="center">{client.vatNumber}</TableCell>
                                <TableCell align="center" style={{ color: client.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                                    {clientStatusFormater(client.status)}</TableCell>
                                <TableCell align="center">{client.countOfUnPaidInvoices}</TableCell>
                                <TableCell align="center">{currencyFormater(client.valueSumOfAllUnPaidInvoices)}</TableCell>

                                <TableCell align="center">{client.countOfOverdueInvoices}</TableCell>
                                <TableCell align="center">{currencyFormater(client.priceOfAllOverdueInvoices)}</TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow>
                        {/* {clients.length != 0 &&
                            <TableCell colSpan={3} align="left">
                                <Button size="large" onClick={openPopupHandler} >
                                    <AddCircleOutlineIcon />
                                    Добави Нов Клиент
                                </Button>
                            </TableCell>

                        } */}


                        <TableCell colSpan={8} align="right"  >
                            <Button disabled={!isClientSelected} size="large" variant="contained" color="primary" onClick={confirmClientHandler}>
                                Потвърди
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
                count={countOfClients}
                onPageChange={handleChangePage}
                onRowsPerPageChange={rowsPerPageHandler}
            />

          </ >
    )
}



                           




