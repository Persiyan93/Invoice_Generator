import { useState, useEffect, } from 'react'
import { useHistory } from 'react-router';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    makeStyles, Button, FormControl, Grid, Select, InputLabel, Paper, MenuItem, Input, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import history from 'react-router-dom'
import useFetchGet from '../../../hooks/useFetchGet';
import apiEndpoints from '../../../services/apiEndpoints';
import SearchIcon from '@material-ui/icons/Search';
import { BorderStyle } from '@material-ui/icons';
import SetStatisticPeriodFrom from '../Elements/SetStatisticPeriodFrom';
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

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            width: 400,
        },
    },
};

const names = [
    { id: 2, name: 'Oliver Hansen' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Петкан' },
    { id: 5, name: 'Драган' },
    { id: 6, name: 'Исмаил' },
    { id: 7, name: 'Бочко' },

];
export default function Searchbar(props) {
    const { selectedUser, setSelectUser,
        setPeriodOfStatistic, periodOfStatistic, setUsersGetTriger, eventTypeId,
        setEventTypeId} = props
    const history = useHistory();
    const [users,setUsers]=useState([]);
    const [eventTypes,setEventTypes]=useState([])
   


    
    const[getUsersTriger,setGetUsersTriger]=useFetchGet(true);
    useFetchGet(apiEndpoints.users,setUsers,getUsersTriger,setGetUsersTriger) 
    
    const [getEventTypesTriger,setGetEventTypesTriger]=useState(true);
    useFetchGet(apiEndpoints.getEventTypes,setEventTypes,getEventTypesTriger,setGetEventTypesTriger);
    
    
        console.log(users);
        console.log(eventTypes);
    function searcHandler() {
        history.push({
            search: `?startDate=${periodOfStatistic.startDate}&endDate=${periodOfStatistic.endDate}`
        })
        setUsersGetTriger(true);
    }

    function filterByUserNameHandler(event) {
        const value = event.target.value;
        setSelectUser(value)
    }
    function changeEventTypeHandler(event) {
        const value = event.target.value;
        setEventTypeId(value)
    }
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.menu} elevation={10}>
            <h1 className={classes.title}>История</h1>
            <Toolbar className={classes.toolbar}>
                <Grid container  >

                    <Grid item md={6} >
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Потребител
                            </InputLabel>
                            <Select
                                native
                                value={selectedUser}
                                onChange={filterByUserNameHandler}
                                input={<Input />}
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.fullName}
                                    </option>
                                ))}

                            </Select>
                        </FormControl>


                    </Grid>

                    <Grid item md={6} >
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Събитие
                            </InputLabel>
                            <Select
                                native
                                value={eventTypeId}
                                onChange={changeEventTypeHandler}
                                input={<Input />}
                            >
                                {eventTypes.map((eventType) => (
                                    <option key={eventType.id} value={eventType.name}>
                                        {eventType.name}
                                    </option>
                                ))}

                            </Select>
                        </FormControl>


                    </Grid>



                </Grid>
                <SetStatisticPeriodFrom className={classes.options}
                    setPeriodOfStatistic={setPeriodOfStatistic}
                    periodOfStatistic={periodOfStatistic}
                ></SetStatisticPeriodFrom>
                <Button startIcon={<SearchIcon />} onClick={searcHandler} className={classes.button} size='small'>Търси</Button>


            </Toolbar>



        </Paper >
    )
}
