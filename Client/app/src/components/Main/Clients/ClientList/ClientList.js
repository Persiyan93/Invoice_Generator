import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Table, } from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as clientsService from '../../../../services/clientsService';
import ClientRow from './ClientRow'
const useStyles = (theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },

}))


class ClientList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            clients: [{
                id: "",
                name: "",
                vatNumber: "",
                countOfInvoice: "",
                countOfOverdueInvoices: "",
                invoices: [
                    {
                        id: "dasdnaskdnojasnd1231-231ndsdjnasd",
                        number: "234",
                        dateOfIssue: "20.04.2021",
                        paymentDueDate: "10.05.2021",
                        price: "240.45",
                        status: "Delay",


                    }
                ]
            }]
        };
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





    render() {

        const { clients } = this.state
        return (
            <React.Fragment>
                <h1 style={{ textAlign: 'center' }}>Клиенти</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">

                        <TableHead>
                            {clients.length != 0 ? (

                                <TableRow>
                                    <TableCell />

                                    <TableCell align="right">Име на фирмата</TableCell>
                                    <TableCell align="right">ДДС Номер</TableCell>
                                    <TableCell align="right">Брой на всички фактури</TableCell>
                                    <TableCell align="right">Брой на просрочени фактури</TableCell>
                                    <TableCell align="right">Действия</TableCell>
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
                            {this.state.clients.map((client) => (
                                <ClientRow key={client.id} {...client} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment >
        )
    }

}
export default withStyles(useStyles)(ClientList);
