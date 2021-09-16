import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles, Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core/';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InfoIcon from '@material-ui/icons/Info';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import { currencyFormater, convertCompanyName, clientStatusFormater, invoiceStatusConverter } from '../../../../services/globalServices'






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
        const { name, vatNumber, countOfOverdueInvoices, invoices,
            companyType, valueSumOfAllUnPaidInvoices, status
            , blockClientHandler, id, activateClientHandler, countOfUnPaidInvoices, priceOfAllOverdueInvoices } = this.props
        return (
            <>
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
                    <TableCell align="center">{countOfUnPaidInvoices}</TableCell>
                    <TableCell align="center">{currencyFormater(valueSumOfAllUnPaidInvoices)}</TableCell>

                    <TableCell align="center">{countOfOverdueInvoices}</TableCell>
                    <TableCell align="center">{currencyFormater(priceOfAllOverdueInvoices)}</TableCell>

                    <TableCell align="right">
                        <Link to={`/Clients/ClientInfo/${this.props.id}`} style={{ textDecoration: 'none' }}>
                            <IconButton size="small" >
                                <InfoIcon fontSize="medium" htmlColor='black' />
                            </IconButton>
                        </Link>
                        <Link to={`/Invoices/NewInvoice?clientId=${this.props.id}`}  >
                            <IconButton size="medium" >
                                <FiberNewIcon fontSize="medium" htmlColor='black' />
                            </IconButton>
                        </Link>
                        {
                            status === 'Blocked' ?
                                (
                                    <IconButton size="medium" onClick={(e) => { activateClientHandler(e, id) }}>
                                        <CheckIcon fontSize="medium" htmlColor='green' />
                                    </IconButton>
                                )
                                :
                                (
                                    <IconButton size="medium" onClick={(e) => { blockClientHandler(e, id) }} >
                                        <BlockIcon fontSize="medium" htmlColor='red' />
                                    </IconButton>
                                )

                        }

                    </TableCell>
                </TableRow>
                <TableRow >

                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div" style={{ textAlign: 'center' }} >
                                    {
                                        invoices.length != 0 ? "Последни 5 фактури" : "Все още няма издадени фактури"
                                    }

                                </Typography>
                                {invoices.length != 0 && <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Фактура 	&#8470; </TableCell>
                                            <TableCell>Дата на издаване</TableCell>
                                            <TableCell>Дата на падеж</TableCell>
                                            <TableCell>Статус</TableCell>
                                            <TableCell>Стойност </TableCell>

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
            </>
        );
    }

}




export default withStyles(useStyles)(ClientRow);