import { useState } from 'react'
import {makeStyles,  Table, TableCell,  TableContainer, TableHead,TableRow, TableBody} from '@material-ui/core/';
import ProgressIndicator from '../../../Elements/ProgressIndicator'
import { currencyFormater } from '../../../../services/globalServices'
import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';
const useStyles = makeStyles(theme => ({

    table: {


        '& thead th': {
            fontWeight: '300',
            fontSize: '15px'
        },
        '& tbody td': {
            fontWeight: '200',
            fontSize: '12px'
        }
        , '& tbody tr:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'
        }
    },


}))
const headCells = [

    { id: 'name', title: 'Име на Клиент' },
    { id: 'vatNumber', title: 'ДДС номер' },
    { id: 'countOfIssuedInvoicesForLastMonth', title: 'Фактури за последния месец' },
    { id: 'allIncomesFromInvoice', title: 'Всички приходи' },
    { id: 'countOfOverduedInvocies', title: 'Брой на просрочените фактури' },
    { id: 'countOfPaidInvocies', title: 'Брой на платените Фактури' },




]
export default function TopClients() {
    const [topClients, setTopClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false)



    const [getTopClientsTriger, setGetTopClientsTriger] = useState(true);
    useFetchGet(apiEndpoints.getTopClients, setTopClients, getTopClientsTriger, setGetTopClientsTriger);

    const classes = useStyles();
    return (
        <>
            <ProgressIndicator
                isLoading={isLoading} />
            <TableContainer component={undefined} className={classes.paper} >
                <Table className={classes.table} style={isLoading ? { opacity: '0.6' } : { opacity: '1.0' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {


                                headCells.map(headCell => (
                                    <TableCell align="left" key={headCell.id}>
                                        {headCell.title}
                                    </TableCell>

                                ))

                            }

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            topClients.map(client => (
                                <TableRow key={client.name}>

                                    <TableCell >
                                        {client.name}
                                    </TableCell>
                                    <TableCell >
                                        {client.vatNumber}
                                    </TableCell>
                                    <TableCell>
                                        {client.invoiceCount}
                                    </TableCell>
                                    <TableCell>
                                        {currencyFormater(client.IncomesFromInvoices)}
                                    </TableCell>
                                    <TableCell>
                                        {client.countOfOverdueInvoices}
                                    </TableCell>
                                    <TableCell>
                                        {client.countOfPaidInvoices}
                                    </TableCell>


                                </TableRow>
                            ))
                        }

                    </TableBody>



                </Table >
            </TableContainer>

        </>
    )
}

