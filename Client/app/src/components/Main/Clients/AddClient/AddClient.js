import AddClientForm from "./AddClientForm";
import {Paper,makeStyles} from "@material-ui/core";

const useStyles=makeStyles(thema=>({
    pageContent:{
        margin:thema.spacing(1),
        padding:thema.spacing(2),
        

    }
}))

const AddClient=(props)=>{
    const classes=useStyles();
return(
    
    <Paper elevation={3} className={classes.pageContent} >
    <AddClientForm/>
    </Paper>
);


}

export default AddClient
