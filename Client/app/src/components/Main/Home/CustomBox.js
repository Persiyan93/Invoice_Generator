import {useState} from 'react';

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
        width: '600px'
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