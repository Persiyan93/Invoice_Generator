import { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    makeStyles, Button, List, ListItem, ListItemText, ListItemIcon, TableCell, TableRow, TableBody, Toolbar, Divider, TextField, InputAdornment, Typography
} from '@material-ui/core/';
import ListAltIcon from '@material-ui/icons/ListAlt';




const useStyles = makeStyles(theme => ({
    span: {
        fontSize: 17,
        fontWeight: 650
    },
    listItem: {
        cursor: 'pointer'
    }


}))




export default function ClientInfoMenu(props) {
    const { changePageHandler  } = props
    const classes = useStyles();
    return (
        <div style={{ width: 200, height: 350, display: 'block', backgroundColor: '#F1F3EF', textAlign:'center' }}>
            <List>
                <ListItem className={classes.listItem}  onClick={(e)=>changePageHandler(e,'Invoices')}>
                    <ListItemIcon><ListAltIcon size='large' htmlColor="black" /> </ListItemIcon>
                    <ListItemText primary='Фактури' />
                </ListItem>
           
            
                <ListItem className={classes.listItem} onClick={(e) => changePageHandler(e, 'CompanyAddresses')}>
                    <ListItemIcon><ListAltIcon size='large' htmlColor="black" /> </ListItemIcon>
                    <ListItemText primary='Адрес на фирмата' />
                </ListItem>
           
          
           <ListItem className={classes.listItem} onClick={(e) => changePageHandler(e, 'ContactList')}>
                    <ListItemIcon><ListAltIcon size='large' htmlColor="black" /> </ListItemIcon>
                    <ListItemText primary='Лица за контакт' />
                    
                </ListItem>
            
      
                <ListItem className={classes.listItem} onClick={(e) => changePageHandler(e, 'AdditionalInfo')}>
                    <ListItemIcon><ListAltIcon size='large' htmlColor="black" /> </ListItemIcon>
                    <ListItemText primary='Допълнителна информация' />
                </ListItem>
            </List>


        </div>


    )
}
