import React, { useState, useEffect } from 'react';
import {
    makeStyles, Button, IconButton, Table, TableCell, TableSortLabel, TableContainer, TableHead,
    Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination, Checkbox
} from '@material-ui/core/';
import { useHistory } from 'react-router-dom'
import getResultAfterPagingAndSorting from '../../../services/sortingService';
import ProgressIndicator from '../ProgressIndicator'
const useStyles = makeStyles(theme => ({

    table: {


        '& thead th': {
            fontWeight: '550',


        },
        '& tbody td': {
            fontWeight: '300',
            //backgroundColor: '#DAD4D3',
            // backgroundColor: invoice

        }, '& tbody tr:hover': {
            // backgroundColor: '#DAD4D3',
            cursor: 'pointer'

        }
    },


}))
const TableWithServerSidePagingAndSorting = (props) => {
    const history = useHistory();

    const { headCells, pagingAndSorting, setPagingAndSorting, isLoading, } = props

    function handleSortRequest(cellId) {
        const { orderBy, order } = pagingAndSorting
        const isAsc = orderBy == cellId && order == "asc"

        if (isAsc) {

            setPagingAndSorting(prevState => ({ ...prevState, order: 'desc' }))
        }
        else {

            setPagingAndSorting(prevState => ({ ...prevState, order: 'asc' }))
            console.log(pagingAndSorting)

        }

        setPagingAndSorting(prevState => ({ ...prevState, orderBy: cellId }))

    }

    const classes = useStyles()
    return (

        <>
            <ProgressIndicator
                isLoading={isLoading} />

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

                {props.children}



            </Table >


        </>
    );


}

export default TableWithServerSidePagingAndSorting








