import {useState} from 'react';
import { makeStyles,Button, } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {

    position:'fixed',
    marginTop:'1%',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts() {
  const classes = useStyles();
  const [isOpen,setOpen]=useState(true);

  return (
    <div className={classes.root}>

      {
        isOpen&&
        <Alert  variant="filled"  severity="warning" onClose={() => {setOpen(false)}}>This is a success alert — check it out!</Alert>

      } 
   
  </div>
  );
}