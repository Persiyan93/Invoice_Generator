import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ListAltIcon from '@material-ui/icons/ListAlt';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',



    },
    drawer: {

        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,


        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    //toolbar: theme.mixins.toolbar,
    toolbar: {
        padding: theme.spacing(2)
    },
    drawerPaper: {
        marginTop: '85px',
        display: 'relative',
        width: drawerWidth,

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),


    },
}));

function DrawerMenu(props) {

    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} >
                <Typography style={{ fontWeight: '550' }} component="h5" variant="h6" align="center">
                    Бързи бутони
                </Typography>

            </div>
            <Divider />
            <List>
            <Link to="/Invoices/NewInvoice" style={{ textDecoration: 'none' }}>
                <ListItem >

                    <ListItemIcon><FiberNewIcon size='large' htmlColor="black"/> </ListItemIcon>
                    <ListItemText primary='Нова фактура' />
                </ListItem>
                </Link>
                <Link to="/Clients/NewClient" style={{ textDecoration: 'none' }}>
                <ListItem >
                    <ListItemIcon><GroupAddIcon size='large' htmlColor="black" /></ListItemIcon>
                    <ListItemText primary='Нов Клиент' />
                </ListItem>
                </Link>

                <Link to="/Products/NewProduct" style={{ textDecoration: 'none' }}>
                <ListItem >
                    <ListItemIcon><AddCircleIcon size='large' htmlColor="black"/></ListItemIcon>
                    <ListItemText primary='Нов Продукт' />
                </ListItem>
                </Link>

                <Link to="/Invoices/All" style={{ textDecoration: 'none' }}>
                <ListItem >
                    <ListItemIcon><ListAltIcon size='large' htmlColor="black"/></ListItemIcon>
                    <ListItemText primary='Всички фактури' />
                </ListItem>
                </Link>

            </List>
            <Divider />

        </div>
    );
}



export default DrawerMenu;