import { useState, useEffect } from 'react'
import {
    makeStyles, Card, CardActions, CardContent, Button, Typography,Checkbox
    , Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Divider
} from '@material-ui/core/';
import BaseTable from '../BaseTable';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EmptyTableBody from '../../EmptyTableBody';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles(theme => ({
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

export default function BasicArticleTable(props) {
    const classes = useStyles();
    const [articles, setArticles] = useState([])
    const headElements = [
        { id: 0, title: '' },
        { id: 1, title: 'Име на артикул' },
        { id: 2, title: 'Наличност' },
        { id: 3, title: 'Цена' },
        { id: 4, title: 'ДДС' },
        { id: 5, title: 'Дата на последна продажба' }

    ]
    function createNewArticleHandler() {

    }

    return (
        <BaseTable
            headElements={headElements}
            isTableEmpty={articles.length == 0}
        >

            <>
                {
                    articles.length == 0 ?
                        (<EmptyTableBody
                            rowText="Все още няма добавени артикули"
                            button={{ title: 'Добавяне на артикул', clickHandler: createNewArticleHandler }}
                        />)
                        :
                        (
                            <>


                                {articles.map(article => (
                                    <TableRow key={article.id} hover={true}>
                                        <TableCell component="th" scope="row" padding="checkbox">
                                            <Checkbox
                                                // id={client.id}
                                                // disabled={!(!isClientSelected || (clientId === client.id))}
                                                color="primary"
                                                // onChange={changeHandler}
                                            // inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            />
                                        </TableCell>
                                        <TableCell>{article.name}</TableCell>
                                        <TableCell>{article.quantity}</TableCell>
                                        <TableCell>{article.unitPrice}</TableCell>
                                        <TableCell>{article.vatRate}</TableCell>
                                        <TableCell>{article.DateOfLastSale}</TableCell>
                                        <TableCell align="left">




                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2} align="left">
                                        <Button size="large"  >
                                            <AddCircleOutlineIcon />
                                            Добави Артикул
                                        </Button>
                                    </TableCell>

                                </TableRow>

                            </>
                        )

                }



            </>


        </BaseTable>
    )
}
