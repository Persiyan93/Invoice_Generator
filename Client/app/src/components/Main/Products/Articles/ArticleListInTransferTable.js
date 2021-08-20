import { useState, useEffect,Fragment } from 'react'
import {
    makeStyles, Button, Checkbox, Grid, TableCell, InputBase, TableContainer, TableHead, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import { currencyFormater,unitTypeFormater } from '../../../../services/globalServices';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginBottom: '2px'
    },
    tableRow: {
        borderTop: "outset",
        borderBottom: "outset",

    },
    gridElement: {

        borderTop: "solid",
        borderLeft: "solid",

        '&:hover': {
            backgroundColor: '#A1A397',
        },
        cursor: 'pointer',
        marginTop: 20,
        borderRadius: 2
    },
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




export default function ArticleListInTransferTable(props) {
    const classes = useStyles();
    const { selectedProductsFromLeftTable, selectProductFromLeftTable, articles,productsFromRightTable } = props
   
    function changeHandler(e) {
        let id = e.target.id
        let indexOfProduct = selectedProductsFromLeftTable.indexOf(x => (x.id === id))

       
        if (selectedProductsFromLeftTable.find(x => (x.id === id))
        ) {
            selectProductFromLeftTable(prevState => (prevState.filter(x => x.id !== id)))

        }
        else {

            var product = articles.find(x => x.id == id);
            selectProductFromLeftTable(prevState => ([...prevState, product]))
        }


    }
    return (
        <Fragment>
         <h3 className={classes.title}> Налични Продукти</h3>
            <TableHead>

                <TableRow className={classes.tableRow}>
                    <TableCell />
                    <TableCell >Име на артикула</TableCell>
                    <TableCell >Номер на артикула</TableCell>
                    <TableCell> Цена без ддс</TableCell>
                 
                    <TableCell>Наличност</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                  articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell component="th" scope="row" padding="checkbox">
                                <Checkbox
                                    id={article.id}
                                    checked={selectedProductsFromLeftTable.some(x=>x.id==article.id)}
                                     disabled={productsFromRightTable.some(x=>x.id==article.id)||article.quantity==0||article.status=='Blocked'}
                                    color="primary"
                                    onChange={changeHandler}
                                
                                />
                            </TableCell>
                            <TableCell>
                                {article.name}
                            </TableCell>
                            <TableCell>
                                {article.articleNumber}%
                            </TableCell>
                            <TableCell>
                                {currencyFormater(article.unitPrice)}
                            </TableCell>
                           
                            <TableCell>
                                {article.quantity+` ${unitTypeFormater(article.unitType)}`}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Fragment>

    )
}

