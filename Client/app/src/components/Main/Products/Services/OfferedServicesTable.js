


import { useState, useEffect, Fragment } from 'react'
import {
    makeStyles, Button, Checkbox, Grid, TableCell, InputBase, TableContainer, TableHead, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination, IconButton
} from '@material-ui/core/';
import TableWithPagingAndSorting from '../../Elements/TableWithPagingAndSorting';
import getResultAfterPagingAndSorting from '../../../../services/sortingService'
import useFetchGet from '../../../../hooks/useFetchGet';
import useFetchPut from '../../../../hooks/useFetchPut';
import apiEndpoints from '../../../../services/apiEndpoints';
import { currencyFormater, unitTypeFormater, productStatusFormater } from '../../../../services/globalServices'
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmPopup from '../../Popup/ConfirmPopup'
import Popup from '../../Popup'
import CheckIcon from '@material-ui/icons/Check';
import ControlPointIcon from '@material-ui/icons/ControlPoint'




const useStyles = makeStyles(theme => ({
    tableRow: {
        borderTop: "outset",
        borderBottom: "outset",

    },
    gridElement: {

        borderTop: "solid",
        borderLeft: "solid",

        '&:hover': {
            backgroundColor: '#A1A397',
        },
        cursor: 'pointer',
        marginTop: 20,
        borderRadius: 2
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    table: {
        '& thead th': {
            fontWeight: '600',


        },
        '& tbody td': {
            fontWeight: '400',

        }, '& tbody tr:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px,5px',
        fontSize: '0.6rem',
        width: '70%',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    },
    menu: {
        marginBottom: '20px',
        borderRadius: '20px'
    }

}))





const headCells = [

    { id: 'name', title: 'Име на услугата' },
    { id: 'defaultPriceWithoutVat', title: 'Цена' },
    { id: 'vatRate', title: 'ДДС ставка', disableSorting: 'true' },
    { id: 'dateOfLastSale', title: 'Дата на последна продажба' },
    { id: 'salesForCurrentMonth', title: 'Продажби за последния месец' },
    { id: 'status', title: 'Статус' },
    { id: 'action', title: 'Действие', disableSorting: 'true' },
]

const pages = [5, 10, 15]
export default function OfferedServicesTable(props) {
    const { filterFunction } = props
    const [services, setServices] = useState([]);
    const [isOpenConfirmPopup, setOpenConfirmPopup] = useState(false);
    const [selectedServiceId, selectServiceId] = useState({})
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [isLoading, setIsLoading] = useState(false);
    const [newStatus, setNewStatus] = useState('')

    //Get serivices
    const [getServicesTriger, setGetServicesTriger] = useState(true);
    useFetchGet(apiEndpoints.getAllServices, setServices, getServicesTriger, setGetServicesTriger)

   //Blockervice
    const [putServiceTriger, setPutServiceTriger] = useState(false);
    var updateServiceUrl = apiEndpoints.updateServiceStatus + `/${selectedServiceId}`;
    useFetchPut(updateServiceUrl, putServiceTriger, setPutServiceTriger, {  status: newStatus });

    function servicesAfterPagingAndSorting(event) {
        const { order, orderBy } = sorting
        const { page, rowsPerPage } = paging
        return getResultAfterPagingAndSorting(filterFunction.fn(services), order, orderBy)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }



    function handleChangePage(event, newPage) {
        setPaging(prevState => ({ ...prevState, page: newPage }));

    }
    function rowsPerPageHandler(event) {
        setPaging({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

    }

    function blockServiceHandler(e, serviceId) {
        
        setNewStatus('Blocked')
        setOpenConfirmPopup(true)
        selectServiceId(serviceId);
    }
    function activateServiceHandler(e, serviceId) {
        setNewStatus('Active')
        setOpenConfirmPopup(true)
        selectServiceId(serviceId);

    }
    function blockService() {
        setPutServiceTriger(true);
        setOpenConfirmPopup(false);
        setGetServicesTriger(true)

    }




    const classes = useStyles();
    return (
        <>

            <TableWithPagingAndSorting
                headCells={headCells}
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
                isLoading={isLoading}
                tableContainer={Paper}

            >
                <TableBody>
                    {
                        servicesAfterPagingAndSorting().map((service) => (
                            <TableRow key={service.id}>


                                <TableCell >
                                    {service.name}
                                </TableCell>
                                <TableCell >
                                    {service.defaultPriceWithoutVat}
                                </TableCell>
                                <TableCell>
                                    {service.vatRate}
                                </TableCell>
                                <TableCell>
                                    {service.dateOfLastSale}
                                </TableCell>
                                <TableCell>
                                    {service.countOfSalesForCurrentMoth} %
                                </TableCell>

                                <TableCell style={{ color: service.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                                    {productStatusFormater(service.status)}
                                </TableCell>
                                <TableCell align='right'>
                                    {service.status === 'Blocked' ?
                                        (
                                            <IconButton size="medium" onClick={(e) => { activateServiceHandler(e, service.id) }}>
                                                <CheckIcon id="block" fontSize="medium" htmlColor={'green'} />
                                            </IconButton>
                                        ) :
                                        (
                                            <IconButton id="activate" size="medium" onClick={(e) => { blockServiceHandler(e, service.id) }}>
                                                <BlockIcon id="block" fontSize="medium" htmlColor={'red'} />
                                            </IconButton>
                                        )

                                    }

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
                count={services.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={rowsPerPageHandler}
            />
            <ConfirmPopup
                setOpenPopup={setOpenConfirmPopup}
                openPopup={isOpenConfirmPopup}
                actionAfterConfirmation={blockService}
                title={newStatus=='Blocked'?'Блокиране на Услуга':'Активиране на Услугата'} 
                question={newStatus=='Blocked'?'Сигурни ли сте че искате да блокирате Услугата'
                        :'Сигурни ли сте че искате да активирате Услугата'}

            >

            </ConfirmPopup>






        </>

    )
}


