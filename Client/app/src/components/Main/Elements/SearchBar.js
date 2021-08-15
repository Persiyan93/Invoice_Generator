import {useState,useEffect} from 'react'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    makeStyles, Button, Table, Grid, InputBase, Paper, Typography, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, TablePagination
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles(theme => ({
   
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
        borderRadius: '20px',
        margin:theme.spacing(2),
        pading:theme.spacing(2),
        borderStyle:'solid'
    
    }


}))


export default function SearchBar(props) {
    const classes=useStyles();
    
    const {title,searchbarLabel,placeholder,searchHandler,filterString}=props

        return (
        <Paper variant="outlined" className={classes.menu} elevation={10}>
        <h1 className={classes.title}>{title}</h1>
        <Toolbar className={classes.toolbar}>
            <TextField className={classes.searchInput}
                onChange={searchHandler}
                value={filterString}
                size="small"
                label={searchbarLabel}
                variant="outlined"
                placeholder={placeholder}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                }}
             

            >
            </TextField>
        </Toolbar>


    </Paper >
    )
}
