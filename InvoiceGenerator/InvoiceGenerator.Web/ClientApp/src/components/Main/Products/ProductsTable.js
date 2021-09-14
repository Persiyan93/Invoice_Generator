import React, { useState, useEffect, } from 'react'
import {makeStyles} from '@material-ui/core/';
import SearchBar from '../../Elements/SearchBar';

import ProductTableNavigationMenu from './ProductTableNavigationMenu';

import ArticlesTable from './Articles/ArticlesTable';
import OfferedServicesTable from './Services/OfferedServicesTable'
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

export default function ProductsTable(props) {
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
            <ProductTableNavigationMenu
                isArticleSelected={isArticleSelected}
                selectArticle={selectArticle}
            />

            {isArticleSelected ?
                (

                    <ArticlesTable
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

