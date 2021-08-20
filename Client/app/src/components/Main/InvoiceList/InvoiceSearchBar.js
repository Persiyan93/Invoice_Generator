import { useState, useEffect, } from 'react'

import queryString from "query-string";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    makeStyles, Button, Table, Grid, InputBase, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';

import SearchIcon from '@material-ui/icons/Search';
import { BorderStyle } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginTop: '2px',
        // marginLeft: '100px',
        // width: '30%',
        // height: '20px'
        //display:'flex'

    }
    ,
    toolbar: {
        marginTop: '5px'
    },
    searchInput: {
        opacity: '0.7',
        padding: '0px,5px',
        fontSize: '0.6rem',
        width: '100%',
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
    },
    options: {
        height: '100px',
        width: '1500px',
        borderRadius: 10,
        marginRight: '10%',
        marginBottom: '1%',
        borderStyle: 'dotted'

    },
    button: {
        marginBottom: '1px'
    }




}))



export default function InvoiceSearchBar(props) {
    const { setInvoicesGetTriger, history, periodOfStatistic, setPeriodOfStatistic, filterString, setFilterString } = props



    function searchHandler(event) {
            setFilterString(event.target.value)

    }

    function changeDateHandler(event) {
        var id = event.target.id;
        var value = event.target.value
        setPeriodOfStatistic(prevState => ({ ...prevState, [id]: value }))
    }


    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.menu} elevation={10}>
            <h1 className={classes.title}></h1>
            <Toolbar className={classes.toolbar}>
                <Grid container  >

                    <Grid item md={10} >
                        <TextField className={classes.searchInput}
                            onChange={searchHandler}
                            value={filterString}
                            size="small"
                            label="Име на Клиентта"
                            variant="outlined"
                            placeholder="Име на клиента"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            }}
                        >
                        </TextField>
                    </Grid>



                </Grid>
                <Paper variant="outlined" className={classes.options}   >
                    <Typography variant="h6" component="h6" className={classes.title}>
                        Период на статистиката
                    </Typography>
                    <Grid container justifyContent="space-around">
                        <Grid item>
                            <TextField
                                id="startDate"
                                label="Начална дата"
                                type="date"
                                onChange={changeDateHandler}
                                value={periodOfStatistic.startDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item>

                        </Grid>

                        <TextField
                            id="endDate"
                            label="Крайна дата"
                            type="date"
                            onChange={changeDateHandler}
                            value={periodOfStatistic.endDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Paper>
                {/* <Button startIcon={<SearchIcon />} onClick={searchHandler} className={classes.button} size='small'>Търси</Button> */}


            </Toolbar>



        </Paper >
    )
}