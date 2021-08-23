import {useState,useEffect,Fragment} from 'react'
import {
    Paper, makeStyles, IconButton, Button, Typography,
    TableRow, TableBody, TableCell, Table, TableHead, TableContainer, InputAdornment, Checkbox, Grid
} from '@material-ui/core'
import SearchBar from '../Elements/SearchBar'
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },
    }
}))


export default function ProductsList() {
    const classes=useStyles();
    const[products,setProducts]=useState([{name:'Извършена транспортна услуга',quantity:20}])
    function changeHandler(e){

    }
    return(
        < Fragment>

            <SearchBar />


            <TableContainer component={Paper}   >


                <Table aria-label="collapsible table" className={classes.table}>
                    <TableHead>

                        <TableRow className={classes.tableRow}>
                            <TableCell />
                            <TableCell >Име на артикула/услуга</TableCell>
                            <TableCell> Наличност</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        <Checkbox
                                            id={product.id}
                                            // disabled={!(!isClientSelected || (clientId === client.id))}
                                            color="primary"
                                            onChange={changeHandler}
                                        // inputProps={{ 'aria-label': 'checkbox with default color' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        {product.quantity}
                                    </TableCell>

                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}
