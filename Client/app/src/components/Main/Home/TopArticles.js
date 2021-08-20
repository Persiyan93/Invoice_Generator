import { useState } from 'react'
import {
    makeStyles, Button, IconButton, Table, TableCell, TableSortLabel, TableContainer, TableHead,
    Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination, Checkbox
} from '@material-ui/core/';
import ProgressIndicator from '../ProgressIndicator'
import { productStatusFormater, unitTypeFormater, currencyFormater } from '../../../services/globalServices'
import useFetchGet from '../../../hooks/useFetchGet';
import apiEndpoints from '../../../services/apiEndpoints';
const useStyles = makeStyles(theme => ({

    table: {


        '& thead th': {
            fontWeight: '300',


        },
        '& tbody td': {
            fontWeight: '200',
            //backgroundColor: '#DAD4D3',
            // backgroundColor: invoice

        }, '& tbody tr:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },


}))
const headCells = [

    { id: 'name', title: 'Име на на артикула' },
    { id: 'articleNumber', title: 'Номер на артикула' },
    { id: 'unitType', title: 'Мерна еденица' },
    { id: 'countOfSales', title: 'Продадено количество' },
    { id: 'dateOfLastSale', title: 'Дата на последна продажба' },
    { id: 'incomes', title: 'Приходи' },
    { id: 'status', title: 'Статус' },


]
export default function TopArticles() {
    const [topArticles, setTopArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false)



    const [getTopArticlesTriger, setGetTopArticlesTriger] = useState(true);
    useFetchGet(apiEndpoints.getTopArticles, setTopArticles, getTopArticlesTriger, setGetTopArticlesTriger);

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
                            topArticles.map(article => (
                                <TableRow key={article.id}>

                                    <TableCell >
                                        {article.name}
                                    </TableCell>
                                    <TableCell >
                                        {article.articleNumber}
                                    </TableCell>
                                    <TableCell>
                                        {unitTypeFormater(article.unitType)}
                                    </TableCell>
                                    <TableCell>
                                        {article.sumQuantityOfAllSales}
                                    </TableCell>
                                    <TableCell>
                                        {article.dateOfLastSale}
                                    </TableCell>
                                    <TableCell>
                                        {currencyFormater(article.incomesFromSales)}
                                    </TableCell>

                                    <TableCell style={{ color: article.status == 'Blocked' ? '#FF0000' : '#0AE209' }}>
                                        {productStatusFormater(article.status)}
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

