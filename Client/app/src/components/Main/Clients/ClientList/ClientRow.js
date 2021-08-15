import React from 'react';
import { Link } from 'react-router-dom'
import { currencyFormater } from '../../../../services/globalServices'
import { withStyles, } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
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
import { convertCompanyName } from '../../../../services/globalServices'
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import {clientStatusFormater,invoiceStatusConverter} from '../../../../services/globalServices'




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


    render() {
        const { open } = this.state
        const { classes } = this.props;
        const { name, vatNumber, countOfInvoices, countOfOverdueInvoices, invoices,
             companyType, valueSumOfAllUnPaidInvoices, status,blockClientHandler,id,activateClientHandler } = this.props
        return (
            <React.Fragment>
                <TableRow className={classes.root} onClick={this.clickHandler}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen()}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {convertCompanyName({ name, companyType })}
                    </TableCell>

                    <TableCell align="center">{vatNumber}</TableCell>
                    <TableCell align="center" style={{ color: status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                    {clientStatusFormater(status)}</TableCell>
                    <TableCell align="center">{countOfInvoices}</TableCell>
                    <TableCell align="center">{countOfOverdueInvoices}</TableCell>
                    <TableCell align="center">{currencyFormater(valueSumOfAllUnPaidInvoices)}</TableCell>
                    <TableCell align="right">
                        <Link to={`/Clients/ClientInfo/${this.props.id}`}   style={{ textDecoration: 'none' }}>
                            <IconButton size="small" >
                                <InfoIcon fontSize="medium" htmlColor='black' />
                            </IconButton>
                        </Link>
                        <IconButton size="medium" onClick={this.deleteHandler}>
                            <MailIcon fontSize="medium" htmlColor='black' />
                        </IconButton>
                        <Link to={`/Invoices/NewInvoice?clientId=${this.props.id}`}  >
                            <IconButton size="medium" >
                                <FiberNewIcon fontSize="medium" htmlColor='black' />
                            </IconButton>
                        </Link>
                        {
                            status === 'Blocked' ?
                                (
                                    <IconButton size="medium" onClick={(e)=>{activateClientHandler(e,id)}}>
                                        <CheckIcon fontSize="medium" htmlColor='green' />
                                    </IconButton>
                                )
                                :
                                (
                                    <IconButton size="medium" onClick={(e)=>{blockClientHandler(e,id)}} >
                                        <BlockIcon fontSize="medium" htmlColor='red' />
                                    </IconButton>
                                )

                        }

                    </TableCell>
                </TableRow>
                <TableRow >

                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
                                    {
                                        invoices.length != 0 ? "Последни фактури" : "Все още няма издадени фактури"
                                    }

                                </Typography>
                                {invoices.length != 0 && <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Фактура 	&#8470; </TableCell>
                                            <TableCell>Дата на издаване</TableCell>
                                            <TableCell>Дата на падеж</TableCell>
                                            <TableCell>Статус</TableCell>
                                            <TableCell>Цена </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell component="th" scope="row">
                                                    {invoice.invoiceNumber}
                                                </TableCell>
                                                <TableCell>{invoice.dateOfIssue}</TableCell>
                                                <TableCell align="left">{invoice.paymentDueDate}</TableCell>
                                                <TableCell align="left">{invoiceStatusConverter(invoice.status)}</TableCell>
                                                <TableCell align="center">{currencyFormater(invoice.priceWithVat)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}

                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

}




export default withStyles(useStyles)(ClientRow);