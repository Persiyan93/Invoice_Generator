


import { useState, useEffect} from 'react'

import {
    makeStyles, Button, Checkbox, TableCell, InputBase, TableContainer, TableHead, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination, IconButton
} from '@material-ui/core/';

import TableWithPagingAndSorting from '../../Elements/TableWithPagingAndSorting';
import getResultAfterPagingAndSorting from '../../../../services/sortingService'
import useFetchGet from '../../../../hooks/useFetchGet';
import useFetchPut from '../../../../hooks/useFetchPut';
import apiEndpoints from '../../../../services/apiEndpoints';
import { currencyFormater, unitTypeFormater, productStatusFormater, } from '../../../../services/globalServices'
import ServiceQuantityInputForm from '../../NewInvoice/ServicesQuantityInputForm';
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
    { id: 'action', title: '', disableSorting: 'true' },
    { id: 'name', title: 'Име на услугата' },
    { id: 'defaultPriceWithoutVat', title: 'Цена' },

    { id: 'dateOfLastSale', title: 'Дата на последна продажба' },
    { id: 'salesForCurrentMonth', title: 'Продажби за последния месец' },
    { id: 'status', title: 'Статус' },
    // { id: 'action', title: 'Действие', disableSorting: 'true' },
]

const pages = [5, 10, 15]
export default function OffeeredServicesTableInNewInvoiceView(props) {
    const { setInvoiceDetails }=props
    const [services, setServices] = useState([]);
    const [filterFunction, setFilterFunction] = useState({ fn: (services) => { return (services) } })
    // const [isOpen, setOpenConfirmPopup] = useState(false);
    const [isServiceSelected, setIsServiceSelected] = useState(false);
    const [selectedService, selectService] = useState({});
    const [isOpenServiceQuantityInputForm, setOpenServiceQuantityInputForm] = useState(false)



    //States related with paging and sorting
    const [sorting, setSorting] = useState({ order: 'asc', orderBy: '' })
    const [paging, setPaging] = useState({ page: 0, rowsPerPage: 10 })
    const [isLoading, setIsLoading] = useState(false);


    //Get serivices
    const [getServicesTriger, setGetServicesTriger] = useState(true);
    useFetchGet(apiEndpoints.getAllServices, setServices, getServicesTriger, setGetServicesTriger)



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

    function changeHandler(event) {
        let pressedServiceId = event.target.id
        if (selectedService.id === pressedServiceId) {
            selectService({});
            setIsServiceSelected(false);

        }
        else {

            selectService(services.find(x => x.id == pressedServiceId));
            setIsServiceSelected(true);
        }

    }

    function confirmServiceHandler() {
        setOpenServiceQuantityInputForm(true);
    }



    const classes = useStyles();
    return (
        <>

            <TableWithPagingAndSorting
                headCells={headCells}
                pagingAndSorting={sorting}
                setPagingAndSorting={setSorting}
                isLoading={isLoading}

            >
                <TableBody>
                    {
                        servicesAfterPagingAndSorting().map((service) => (
                            <TableRow key={service.id}>
                                {
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        <Checkbox
                                            id={service.id}
                                            //disabled={false}

                                            disabled={(!(!isServiceSelected || (selectedService.id === service.id)) || service.status === 'Blocked')}
                                            color="primary"
                                            onChange={changeHandler}

                                        />
                                    </TableCell>

                                }


                                <TableCell >
                                    {service.name}
                                </TableCell>
                                <TableCell >
                                    {service.defaultPriceWithoutVat}
                                </TableCell>

                                <TableCell>
                                    {service.dateOfLastSale}
                                </TableCell>
                                <TableCell>
                                    {service.countOfSalesForCurrentMonth}
                                </TableCell>

                                <TableCell style={{ color: service.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                                    {productStatusFormater(service.status)}
                                </TableCell>

                            </TableRow>
                        ))
                    }
                    <TableCell colSpan={8} align="right"  >
                        <Button disabled={!isServiceSelected} size="large" variant="contained" color="primary" onClick={confirmServiceHandler}>
                            Добави
                        </Button>
                    </TableCell>
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


            <Popup
                setOpenPopup={setOpenServiceQuantityInputForm}
                openPopup={isOpenServiceQuantityInputForm}
                title='Добавяне на услуга'
                width='sm'>
                <ServiceQuantityInputForm
                    services={props.services}
                    setInvoiceDetails={setInvoiceDetails}
                    selectedService={selectedService}
                    setOpenPopup={setOpenServiceQuantityInputForm}
                />

            </Popup>




        </>

    )
}


