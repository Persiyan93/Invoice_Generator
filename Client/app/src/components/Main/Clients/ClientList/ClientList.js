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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as Row from './ClientRow'
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
                name: "Vladis",
                vatNumber: "BG213123123",
                invoiceCount: "10",
                countOfoverdueInvoices: "1",
                invoices: [
                    {
                        id:"dasdnaskdnojasnd1231-231ndsdjnasd",
                        number:"234",
                        dateOfIssue:"20.04.2021",
                        maturityDate:"10.05.2021",
                        price:"240.45",
                        status:"Delay",
                        

                    }
                ]
            }]
        };
    }

    componentDidMount() {
        // console.log(this.props.match);
        // console.log(this.props.location);
        // var response = getClientInfo(this.props.match.params['ClientId'])
        //     .then(resp => {

        //         if (resp.status != 200) {
        //             response.then(res => console.log(res))

        //         }
        //         else {
        //             resp.json()
        //                 .then(clientInfo => {
        //                     this.setState({ ...clientInfo })
        //                     console.log(this.state)
        //                 })
        //                 .catch(err => console.log(err))
        //         }
        //     })
        //     .catch(err => console.log(err))




    }





    render() {
        // let { name, companyType, vatNumber, accontablePersonName, uniqueIdentificationNumber, address: { town, country, addressText } } = this.state;
        // const { classes } = this.props;
        // const rows = [

        // ];

        return (
            <React.Fragment>
                <h1 className="heading">Клиенти</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Клиенти</TableCell>
                                <TableCell align="right">Име на фирмата</TableCell>
                                <TableCell align="right">ДДС Номер</TableCell>
                                <TableCell align="right">Брой на всички фактури</TableCell>
                                <TableCell align="right">Брой на просрочени фактури</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.clients.map((client) => (
                                <Row key={client.id} {...client} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }

}
export default withStyles(useStyles)(ClientList);
