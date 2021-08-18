import { useState, useEffect } from 'react';
import { makeStyles, Button, } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root:style=>(  {
    
    display:'',
    position: style.position ? style.position:'relative',
    display: 'center',
    width: '100%',
   

  }),
  notification:{
    margin:theme.spacing(2)
  }
}));
// 
export default function SimpleAlerts(props) {
  const { notification, setNotification } = props
  const { isOpen,position,severity="warning" } = notification
  useEffect(() => {
    setTimeout(closeNotification, 5000)
  }, [notification.isOpen])


  function closeNotification() {
    setNotification(prevState => ({ ...prevState, isOpen: false }))
  }
  const classes = useStyles({position});
  return (
    
    <div className={classes.root}>
      {notification.messages?.map((message) => (
        
          isOpen &&
        <Alert className={classes.notification}  key ={message}variant="filled" severity={severity} onClose={closeNotification}>{message}</Alert>

        

      ))}


    </div>
  );
}