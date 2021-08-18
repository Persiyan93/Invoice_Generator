import React from 'react'
import { useState, useEffect,} from 'react'
import { useHistory } from 'react-router';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    makeStyles, Button, Table, Grid, InputBase, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';

import SearchIcon from '@material-ui/icons/Search';
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
        borderStyle:'dotted'

    },
    button:{
        marginBottom:'1px'
    }




}))




export default function SetStatisticPeriodFrom(props) {
    const {periodOfStatistic,setPeriodOfStatistic}=props
    function changeDateHandler(e){
        let name=e.target.id;
        let value=e.target.value
      setPeriodOfStatistic(prevState=>({...prevState,[name]:value}))
    }
    const classes=useStyles()
    return (
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
                                }}/>
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
                            }}/>
                    </Grid>
                </Paper>
    )
}
