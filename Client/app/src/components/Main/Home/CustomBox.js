import {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, } from '@material-ui/core/';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { Typography, Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#EAF0E3',
        borderRadius: 10,
        display: 'flex'
    },
    body: {
        backgroundColor: 'white'

    },
    container: {
        height: '150px',
        width: '800px'
    }


}));

function CustomBox(props) {
    const { content, removeContentFromHomePageHandler } = props
    const [isBodyOpen,setBodyOpen]=useState(true);
function closeBodyHandler(){
    setBodyOpen(prevState=>(!prevState))
}
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {/* style={{ fontWeight: '550' }} */}
            <div className={classes.header}>
                <Grid container>

                    <Grid item md={11}>
                        <Typography component="h5" variant="h6">
                            {content.bulgarianName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CloseIcon
                            style={{ width: "45%", cursor: "pointer", float: "right" }}
                            onClick={(e) => removeContentFromHomePageHandler(e, content.id)}
                        />
                        <ImportExportIcon 
                        style={{ width: "45%", cursor: "pointer", float: "right" }}
                        onClick={closeBodyHandler}
                        
                        />
                    </Grid>
                </Grid>







            </div>
            <div className={classes.body}>
               {
                   isBodyOpen&&
                props.children
               }
              

            </div>

        </div>
    )
}



export default CustomBox;