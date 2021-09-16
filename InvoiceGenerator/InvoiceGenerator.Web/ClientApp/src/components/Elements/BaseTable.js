import React from 'react'
import {
    makeStyles, Card, CardActions, CardContent, Button, Typography
    , Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Divider
} from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({

    title: {
        fontSize: 20,
    },
    root: {
        width: '90%',
        display: 'block',
        alignItems: 'center',
        margin: 60,
        marginBottom: 30, //40
        // pading: '0 15px',
        borderRadius: 10,
        background: '#E6EAE9'




    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})


export default function BaseTable(props) {
    console.log('inside base table')
    const classes = useStyles();
    const { headElements, isTableEmpty } = props
    console.log(headElements)

    return (
        <TableContainer component={Paper} className={classes.root}  >
            <Table aria-label="collapsible table" className={classes.table}>

                <TableHead>
                    {isTableEmpty ?
                        props.children
                        :

                        (
                            <TableRow>

                                {
                                    headElements.map((headElement) => (
                                        <TableCell align={headElement.align ? 'left' : headElement.align} key={headElement.id} >
                                            {headElement.title}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        )
                    }

                </TableHead>

                <TableBody>
                    {!isTableEmpty && props.children}
                </TableBody>


            </Table>
        </TableContainer>
    )
}



