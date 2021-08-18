import { useState, useEffect } from 'react';
import { makeStyles, Button, } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {

        position: 'fixed',
        width: '90%',

    },
}));
// 
export default function SimpleAlerts(props) {

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(closeNotification, 5000)
    }, [notification.isOpen])


    function closeNotification() {
        setOpen(false)
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>

            {

                isOpen &&
                <Alert variant="filled" severity="warning" onClose={closeNotification}>{notification.message}</Alert>

            }

        </div>
    );
}