import React, { useState, useEffect } from 'react';
import {
    makeStyles, Button, IconButton, Table, TableCell, TableSortLabel, TableContainer, TableHead,
    Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination, Checkbox
} from '@material-ui/core/';
import getResultAfterPagingAndSorting from '../../../services/sortingService';
import SearchBar from '../SearchBar';
import ProgressIndicator from '../ProgressIndicator'
const useStyles = makeStyles(theme => ({
 
    table: {
        position: 'relative',

        '& thead th': {
            fontWeight: '600',


        },
        '& tbody td': {
            fontWeight: '300',
            // backgroundColor: invoice

        }, '& tbody tr:hover': {
            // backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },
    

}))
const TableWithPagingAndSorting = (props) => {
    const { headCells, elements, filterFunction, isLoading,setElementsAfterPagingAndSorting } = props
    const [filterString, setFilterString] = useState('')
    const [filterFunc, setFilterFunc] = useState({ fn: (elements) => { return elements } })
    const [pagingAndSorting, setPagingAndSorting] = useState({ order: 'asc', orderBy: '' })

    function elementsAfterPagingAndSorting(event) {
        const { order, orderBy } = pagingAndSorting
        var elements= getResultAfterPagingAndSorting(filterFunc.fn(elements), order, orderBy)
        setElementsAfterPagingAndSorting([...elements])
    }
    function searchHandler(event) {
        let target = event.target;
        setFilterString(target.value)

        setFilterFunc({
            fn: elements => {
                if (target.value == '') {
                    return elements;
                }
                else {
                    return elements.filterFunction
                }
            }
        })



    }

    function handleSortRequest(cellId) {
        const { orderBy, order } = pagingAndSorting
        const isAsc = orderBy == cellId && order == "asc"

        if (isAsc) {
            setPagingAndSorting(prevState => ({ ...prevState, order: 'desc' }))
        }
        else {
            setPagingAndSorting(prevState => ({ ...prevState, order: 'asc' }))

        }
        setPagingAndSorting(prevState => ({ ...prevState, orderBy: cellId }))

    }

    const classes = useStyles()

    return (

        <>
            <ProgressIndicator
                isLoading={isLoading} />
            <SearchBar
                style={isLoading ? { opacity: '0.6' } : { opacity: '1.0' }}
                title='Служители'
                searchbarLabel='Намери служители'
                placeholder='Номер на фактурата'
                searchHandler={searchHandler}
                filterString={filterString}
            />




            <Table className={classes.table} style={isLoading ? { opacity: '0.6' } : { opacity: '1.0' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {


                            headCells.map(headCell => (
                                <TableCell align="right" key={headCell.id}>
                                    {headCell.disableSorting ? headCell.title :
                                        <TableSortLabel
                                            active={pagingAndSorting.orderBy == headCell.id}
                                            direction={pagingAndSorting.orderBy == headCell.id ? pagingAndSorting.order : 'asc'}
                                            onClick={() => (handleSortRequest(headCell.id))}

                                        >
                                            {headCell.title}
                                        </TableSortLabel>
                                    }
                                </TableCell>

                            ))

                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            props.children
                        }
                </TableBody>


            </Table >


        </>
    );


}

export default TableWithPagingAndSorting








