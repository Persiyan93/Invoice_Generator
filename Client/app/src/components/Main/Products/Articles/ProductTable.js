import React, { useState, useEffect, } from 'react'
import {
    makeStyles, Button, Table, Grid, TableCell, InputBase, TableContainer, TableHead, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import * as productService from '../../../../services/productsService'
import SearchBar from '../../Elements/SearchBar';
import useFetch from '../../../../hooks/useFetch';
import apiEndpoints from '../../../../services/apiEndpoints';
import TableNavigationMenu from './TableNavigationMenu';
import BasicArticleTable from './BasicArticleTable';
import ArticleTable from './ArticleTable';
import OfferedServicesTable from '../Services/OfferedServicesTable'
const useStyles = makeStyles(theme => ({
    tableRow: {
        borderTop: "outset",
        borderBottom: "outset",

    },
    gridElement: {
        // border-left: 1px solid;
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

export default function ProductTable(props) {
    const classes = useStyles();
    const [isArticleSelected, selectArticle] = useState(true)
    const [filterString, setFilterString] = useState();
    const [articleFilterFunction, setArticleFilterFunc] = useState({ fn: (elements) => { return elements } })
    const [serviceFilterFunction, setServiceFilterFunc] = useState({ fn: (elements) => { return elements } })



    function searchHandler(event) {
        let target = event.target;
        setFilterString(target.value)

        if (isArticleSelected) {
            setArticleFilterFunc({
                fn: elements => {
                    if (target.value == '') {
                        return elements;
                    }
                    else {
                        return elements.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            })
        }
        else {
            setServiceFilterFunc({
                fn: elements => {
                    if (target.value == '') {
                        return elements;
                    }
                    else {
                        return elements.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            })
        }
    }







    return (
        <>

            <SearchBar
                title='Продукти'
                searchbarLabel='Намери продукт'
                placeholder='Име или номер на продукт'
                filterString={filterString}
                searchHandler={searchHandler}
            />
            <TableNavigationMenu
                isArticleSelected={isArticleSelected}
                selectArticle={selectArticle}
            />

            {isArticleSelected ?
                (

                    <ArticleTable
                        filterFunction={articleFilterFunction}

                    />

                )
                :
                (
                    <OfferedServicesTable
                        filterFunction={articleFilterFunction} />
                )

            }










        </>
    )
}
