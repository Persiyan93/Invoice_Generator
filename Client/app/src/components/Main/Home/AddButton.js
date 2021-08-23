import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Paper,Typography,makeStyles,IconButton} from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
root:{
        width:'80px',
        height:'80px',
        backgroundColor:'white',
        //borderStyle:'solid',
        borderRadius:10,
        '&:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'
          }
     
        
}


}));

function AddButton(props) {
    const{ setOpenControlPanel}=props

    function openControlPanel(){
        setOpenControlPanel(true)
    }
    const classes=useStyles();
    return (
        <div className={classes.root}  onClick={openControlPanel}>
            
           
                <AddIcon htmlColor='green'   size='large'></AddIcon>
          
            <Typography  variant="subtitle2" align="center">
              Добави статистика
            </Typography>
        </div>
    )
}



export default AddButton;