import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core/';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ListAltIcon from '@material-ui/icons/ListAlt';



const useStyles = makeStyles((theme) => ({

    toolbar: {
        padding: theme.spacing(2)
    },
  
}));

function DrawerMenu(props) {
    let { clickHandler } = props;
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

                        <ListItemIcon><FiberNewIcon size='large' htmlColor="black" /> </ListItemIcon>
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
                        <ListItemIcon><AddCircleIcon size='large' htmlColor="black" /></ListItemIcon>
                        <ListItemText primary='Нов Продукт' />
                    </ListItem>
                </Link>

                <Link to="/Invoices/All" style={{ textDecoration: 'none' }}>
                    <ListItem >
                        <ListItemIcon><ListAltIcon size='large' htmlColor="black" /></ListItemIcon>
                        <ListItemText primary='Всички фактури' />
                    </ListItem>
                </Link>

            </List>
            <Divider />
            <List>
                <ListItem onClick={clickHandler} style={{ cursor: 'pointer' }} >

                    <ListItemIcon><FiberNewIcon size='large' htmlColor="black" /> </ListItemIcon>
                    <ListItemText primary='Нова статистика' />
                </ListItem>



            </List>

        </div>
    );
}



export default DrawerMenu;