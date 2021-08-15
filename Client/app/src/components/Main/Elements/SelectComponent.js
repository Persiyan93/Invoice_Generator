import { useState, useEffect, } from 'react'
import { useHistory } from 'react-router';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    makeStyles, Button, FormControl, Grid, Select, InputLabel, Paper, MenuItem, Input, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';

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
    const { selectedUser, setSelectUser, setPeriodOfStatistic, periodOfStatistic, setUsersGetTriger } = props
    const [filterString, setFilterString] = useState('')

    const history = useHistory();



    function changeDateHandler(event) {
        var id = event.target.id;
        var value = event.target.value
        setPeriodOfStatistic(prevState => ({ ...prevState, [id]: value }))
    }
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
    const classes = useStyles();
    return (



        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="select-multiple-native">
                {title}
            </InputLabel>
            <Select
                native
                value={selectedElement}
                onChange={filterByUserNameHandler}
                input={<Input />}
                inputProps={{
                    id: 'select-multiple-native',

                }}
                MenuProps={MenuProps}
            >
                {elements.map((element) => (
                    <option key={element.id} value={element.value}>
                        {element.value}
                    </option>
                ))}

            </Select>
        </FormControl>






    )
}
