import React from 'react';
import {Link} from 'react-router-dom'

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
import { Button } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { LinkedCamera } from '@material-ui/icons';



const useStyles = (theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },

}))


class ClientRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }

        

    }
   
    setOpen() {
      

        this.setState((state) => {
            return { open: !this.state.open }
        })
    }

    //[{name:"Vladis",vatNumber:"BG213123123" ,invoiceCount:"10",countOfoverdueInvoices:"1"}]
    render() {
        const { open } = this.state
        const { classes } = this.props;
        const { name, vatNumber, countOfInvoice, countOfOverdueInvoices, invoices } = this.props
        return (
            <React.Fragment>
                <TableRow className={classes.root} onClick={this.clickHandler}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen()}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>

                    <TableCell align="right">{vatNumber}</TableCell>
                    <TableCell align="right">{countOfInvoice}</TableCell>
                    <TableCell align="right">{countOfOverdueInvoices}</TableCell>
                    <TableCell align="right">
                        <Link to={`/Clients/ClientInfo/${this.props.id}`}  >
                        <Button size="small" >
                            <InfoIcon fontSize="small" />
                        </Button>
                        </Link>
                        <Button size="small" onClick={this.deleteHandler}>
                            <MailIcon fontSize="small" />
                        </Button>
                        <Button size="small" onClick={this.deleteHandler}>
                            <ReceiptIcon fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow >

                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
                                    {
                                        invoices.length != 0 ? "Последни фактури" : "Все още няма издадени фактури"
                                    }

                                </Typography>
                                {invoices.length != 0 ? <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Номер на фактурата</TableCell>
                                            <TableCell>Дата на издаване</TableCell>
                                            <TableCell>Дата на падеж</TableCell>
                                            <TableCell>Цена</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell component="th" scope="row">
                                                    {invoice.number}
                                                </TableCell>
                                                <TableCell>{invoice.dateOfIssue}</TableCell>
                                                <TableCell align="right">{invoice.paymentDueDate}</TableCell>
                                                <TableCell align="right">{invoice.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> : ''}

                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

}




export default withStyles(useStyles)(ClientRow);