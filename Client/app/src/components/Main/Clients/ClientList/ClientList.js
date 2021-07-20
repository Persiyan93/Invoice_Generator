import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Table, InputBase, Paper, Typography, TableRow, TableBody, Toolbar, TableSortLabel, TextField, InputAdornment, TablePagination } from '@material-ui/core/';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import SearchIcon from '@material-ui/icons/Search';
import * as clientsService from '../../../../services/clientsService';
import ClientRow from './ClientRow'
import reactDom from 'react-dom';
const useStyles = (theme => ({
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
            fontWeight: '300',

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


class ClientList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 0,
            rowsPerPage: 5,
            order: '',
            orderBy: '',
            filterFunc: { fn: items => { return items } },
            filterString: '',
            clients: [{
                id: "",
                name: "",
                vatNumber: "",
                countOfInvoice: "",
                countOfOverdueInvoices: "",
                invoices: []
            }]
        };
        this.clientsAfterPagingAndSorting = this.clientsAfterPagingAndSorting.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this)
        this.rowsPerPageHandle = this.rowsPerPageHandle.bind(this);
        this.handleSortRequest = this.handleSortRequest.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {

        clientsService.getAllClients()
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log('Unsuccessful status ')
                    console.log(res);
                }
                else {
                    this.setState({ clients: res })
                }

            })
            .catch(err => {
                this.props.history.push('/Errors/ConnectionError')
            })
    }



    handleChangePage(event, newPage) {
        this.setState({ page: newPage });
    }
    rowsPerPageHandle(event) {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
        this.setState({ page: 0 });
    }

    clientsAfterPagingAndSorting(event) {
        const { page, rowsPerPage, order, orderBy } = this.state;
        console.log(this.state.filterFunc.fn(this.state.clients))
        return this.stableSort(this.state.filterFunc.fn(this.state.clients), this.getComperator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    }
    getComperator(order, orderBy) {
        return order == 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy)
    }
    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    stableSort(clients, comparator) {

        const stabilizedThis = clients.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order != 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    handleSortRequest(cellId) {
        const { orderBy, order } = this.state
        const isAsc = orderBy == cellId && order == "asc"
        console.log(isAsc);
        if (isAsc) {
            this.setState({ order: 'desc' })
        }
        else {
            this.setState({ order: 'asc' })
        }
        this.setState({ orderBy: cellId })


    }

    handleSearch(event) {
        let target = event.target;
        const { clients } = this.state
        this.setState({ filterString: target.value })
        console.log(target.value)

        this.setState({
            filterFunc: {
                fn: clients => {
                    if (target.value == '') {
                        return clients;
                    }
                    else {
                        console.log('Inside here')
                        return clients.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            }

        })
        console.log(this.state)
    }


    render() {

        const pages = [5, 10, 20]
        const { classes } = this.props
        const { clients, page, rowsPerPage, orderBy, order, filterString } = this.state
        const headCells = [
            { id: 'name', title: 'Име на фирмата' },
            { id: 'vatNumber', title: 'ДДС Номер' },
            { id: 'countOfInvoice', title: 'Брой на всички фактури' },
            { id: 'countOfOverdueInvoices', title: 'Брой на просрочени фактури' },
            { id: 5, title: 'Действие', disableSorting: 'true' },
        ]
        return (
            <  >
                <Paper variant="outlined" className={classes.menu} elevation={20}>
                    <h1 style={{ textAlign: 'center' }}>Клиенти</h1>
                    <Toolbar>
                        <TextField className={classes.searchInput}
                            value={filterString}
                            label="Намери клиент"
                            variant="outlined"
                            placeholder="Име на клиент "
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            }}
                            onChange={this.handleSearch}

                        >
                        </TextField>
                    </Toolbar>

                </Paper>

                <TableContainer component={Paper}  >
                    <Table aria-label="collapsible table" className={classes.table}>

                        <TableHead>
                            {clients.length != 0 ? (
                                <TableRow>
                                    <TableCell />
                                    {

                                        headCells.map(headCell => (
                                            <TableCell align="right" key={headCell.id}>
                                                {headCell.disableSorting ? headCell.title :
                                                    <TableSortLabel
                                                        active={orderBy == headCell.id}
                                                        direction={orderBy == headCell.id ? order : 'asc'}
                                                        onClick={() => (this.handleSortRequest(headCell.id))}

                                                    >
                                                        {headCell.title}
                                                    </TableSortLabel>
                                                }
                                            </TableCell>

                                        ))

                                    }
                                </TableRow>

                            )
                                :
                                (

                                    <TableRow>
                                        < Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
                                            Все още няма добавени клиенти.
                                        </Typography>
                                        <Typography>
                                            <Button size="large">
                                                <AddCircleOutlineIcon />
                                                Добави Клиент
                                            </Button>
                                        </Typography>

                                    </TableRow>

                                )}
                        </TableHead>

                        <TableBody>
                            {this.clientsAfterPagingAndSorting().map((client) => (
                                <ClientRow key={client.id} {...client} align="right" />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    page={page}
                    component="div"
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={this.state.clients.length}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.rowsPerPageHandle}
                />



            </ >
        )

    }

}
export default withStyles(useStyles)(ClientList);








