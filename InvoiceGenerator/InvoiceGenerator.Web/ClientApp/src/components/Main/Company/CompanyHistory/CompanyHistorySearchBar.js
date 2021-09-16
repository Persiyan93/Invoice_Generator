import { useState } from 'react'
import { makeStyles, FormControl, Grid, Select, InputLabel, Paper, Input, Toolbar } from '@material-ui/core/';
import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';
import { TrendingUpRounded } from '@material-ui/icons';
import SetStatisticPeriod from '../../../Elements/SetStatisticPeriod';
import { eventTypeConverter } from '../../../../services/globalServices'
const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginTop: '2px',
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




export default function Searchbar(props) {
    const { selectedUser, setSelectUser,
        setPeriodOfStatistic, periodOfStatistic, setUsersGetTriger, eventTypeId,
        setEventTypeId } = props
    const [users, setUsers] = useState([]);
    const [eventTypes, setEventTypes] = useState([])



    //GetAllUserNames
    const [getUsersTriger, setGetUsersTriger] = useState(true);
    useFetchGet(apiEndpoints.getUsers, setUsers, getUsersTriger, setGetUsersTriger)


    //GetTypeofEvents
    const [getEventTypesTriger, setGetEventTypesTriger] = useState(TrendingUpRounded);
    useFetchGet(apiEndpoints.getEventTypes, setEventTypes, getEventTypesTriger, setGetEventTypesTriger);



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
                                <option value='All'>
                                    Всички
                                </option>
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
                                <option value='All'>
                                    Всички
                                </option>
                                {eventTypes.map((eventType) => (
                                    <option key={eventType} value={eventType}>
                                        {eventTypeConverter(eventType)}
                                    </option>
                                ))}

                            </Select>
                        </FormControl>


                    </Grid>



                </Grid>
                <SetStatisticPeriod className={classes.options}
                    setPeriodOfStatistic={setPeriodOfStatistic}
                    periodOfStatistic={periodOfStatistic}
                />
            </Toolbar>
        </Paper >
    )
}
