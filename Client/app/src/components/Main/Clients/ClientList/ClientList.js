import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as clientsService from'../../../../services/clientsService';
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
                id:"dasdasdasdas",
                name: "Vladis",
                vatNumber: "BG213123123",
                countOfInvoice: "10",
                countOfOverdueInvoices: "1",
                invoices: [
                    {
                        id:"dasdnaskdnojasnd1231-231ndsdjnasd",
                        number:"234",
                        dateOfIssue:"20.04.2021",
                        paymentDueDate:"10.05.2021",
                        price:"240.45",
                        status:"Delay",
                        

                    }
                ]
            }]
        };
    }

    componentDidMount() {
       
        clientsService.getAllClients()
        .then(resp=> resp.json() )
        .then(result=>
            this.setState({clients:result})
            )
        .catch(err=>console.log(err))




    }





    render() {
      

        return (
            <React.Fragment>
                <h1 className="heading">Клиенти</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                               
                                <TableCell align="right">Име на фирмата</TableCell>
                                <TableCell align="right">ДДС Номер</TableCell>
                                <TableCell align="right">Брой на всички фактури</TableCell>
                                <TableCell align="right">Брой на просрочени фактури</TableCell>
                                <TableCell align="right">Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.clients.map((client) => (
                                <ClientRow key={client.id} {...client}  />
                            ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }

}
export default withStyles(useStyles)(ClientList);
