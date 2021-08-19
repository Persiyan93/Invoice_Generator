import { useEffect, useState } from 'react';
import React from 'react'
import { makeStyles, Paper, TablePagination, TextField, Button, Typography, TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import useFetchGet from '../../../hooks/useFetchGet';
import apiEndpoints from '../../../services/apiEndpoints';
import Popup from '../Popup';
import AddClientForm from '../Clients/AddClient/AddClient';
import EmptyTableBody from '../../EmptyTableBody';
import SearchBar from '../Elements/SearchBar';
import TableWithPagingAndSorting from '../Elements/TableWithPagingAndSorting'
import { convertCompanyName, currencyFormater, clientStatusFormater } from '../../../services/globalServices'
import getResultAfterPagingAndSorting from '../../../services/sortingService'

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

    { id: 'selector', title: '' },
    { id: 'name', title: 'Име на фирмата' },
    { id: 'vatNumber', title: 'ДДС Номер' },
    { id: 'status', title: 'Статус' },
    { id: 'countOfOverdueInvoices', title: 'Брой на просрочени фактури', disableSorting: 'true' },
    { id: 'priceOfAllOverdueInvoices', title: 'Обща стойност на просрочените фактури' },
    { id: 'countOfUnPaidInvoices', title: '  Брой на неплатените фактури' },
    { id: 'valueSumOfAllUnPaidInvoices', title: 'Обща стойност на неплатените фактури' },

]
const pages = [5, 10]
export default function ClientListInInvoice(props) {

    //States related with paging and sorting 
    const [filterString, setFilterString] = useState('');
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [isLoading, setIsLoading] = useState(false);
    const [filterFunc, setFilterFunc] = useState({ func: (clients) => { return (clients) } })


    const [isOpenPopup, setOpenPopup] = useState(false);
    const [clients, setClients] = useState([])
    const [isClientSelected, selectClient] = useState(false);
    const [clientId, setClientId] = useState('')


    //Get Clients
    const [clientsGetTrieger, setClientsGetTriger] = useState(true);
    useFetchGet(apiEndpoints.allClients, setClients, clientsGetTrieger, setClientsGetTriger);

    function clientsAfterPagingAndSorting(event) {
        const { order, orderBy } = sorting
        const { page, rowsPerPage } = paging
        return getResultAfterPagingAndSorting(filterFunc.func(clients), order, orderBy)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }



    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }));

    }
    function rowsPerPageHandler(event) {
        setPaging({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

    }
    function searchHandler(event) {
        let target = event.target;
        setFilterString(target.value)
        setFilterFunc({
            func: clients => {
                if (target.value == '') {
                    return clients
                }
                else {

                    return clients
                        .filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()) ||
                            x.vatNumber.includes(target.value))


                }
            }
        })
    }
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
    const classes = useStyles();
    return (
        <>


            <SearchBar
                title='Клиент'
                searchbarLabel='Намери Клиент'
                placeholder='Име на клиента или ДДС номер'
                filterString={filterString}
                searchHandler={searchHandler}
            />



            <TableWithPagingAndSorting
                headCells={headCells}
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
                isLoading={isLoading}

            >

                <TableBody className={classes.body}>
                    {

                        clientsAfterPagingAndSorting().map((client) => (

                            < TableRow key={client.id} hover={true} className={classes.row}>
                                {
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        <Checkbox
                                            id={client.id}
                                            disabled={(!(!isClientSelected || (clientId === client.id) )|| client.status === 'Blocked')}
                                           // disabled={(!(!isClientSelected || (clientId === client.id) )|| client.statys === 'Blocked')}
                                            color="primary"
                                            onChange={changeHandler}

                                        />
                                    </TableCell>
                                }



                                <TableCell>{convertCompanyName(client)}</TableCell>
                                <TableCell align="right">{client.vatNumber}</TableCell>
                                <TableCell align="center"
                                    style={{ color: client.status == 'Blocked' ? '#FF0000' : '#0AE209' }}
                                >{clientStatusFormater(client.status)}
                                </TableCell>


                                <TableCell align="center">{(client.countOfOverdueInvoices)}</TableCell>
                                <TableCell align="right">{currencyFormater(client.priceOfAllOverdueInvoices)}</TableCell>
                                <TableCell align="right">{client.countOfUnPaidInvoices}</TableCell>
                                <TableCell align="center">{currencyFormater(client.valueSumOfAllUnPaidInvoices)}</TableCell>
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


            </TableWithPagingAndSorting>

            <TablePagination
                page={paging.page}
                component="div"
                rowsPerPageOptions={pages}
                rowsPerPage={paging.rowsPerPage}
                count={clients.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={rowsPerPageHandler}
            />

            <Popup
                setOpenPopup={setOpenPopup}
                openPopup={isOpenPopup}
                title='Добавяне на клиент'
                width='sm'>
                <AddClientForm />

            </Popup>













        </ >
    )
}





   // :
                            // (
                            //     <EmptyTableBody
                            //         rowText="Все още няма добавени клиенти"
                            //         button={{ title: 'Добави клиент', clickHandler: openPopupHandler }}
                            //     />
                            // )

