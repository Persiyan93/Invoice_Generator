import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: style => ({
      
        display:'inline',
        marginTop: theme.spacing(2),
        display: 'center',
        width: '100%',
        zIndex :1000
    }),
    notification: {
        margin: theme.spacing(2),
        marginTop: 0
    }
}));

export default function SimpleAlerts(props) {
    const { notification, setNotification } = props
    const { isOpen, position, severity = "warning", message } = notification
    useEffect(() => {
        setTimeout(closeNotification, 5000)
    }, [notification.isOpen])


    function closeNotification() {
        setNotification(prevState => ({ ...prevState, isOpen: false }))
    }
    const classes = useStyles({ position });
    return (
        <>
            {
                isOpen && (
                    <div className={classes.root}>
                        <Alert className={classes.notification} variant="filled" severity={severity} onClose={closeNotification}>
                            {message}
                        </Alert>


                    </div>
                )

            }
        </>


    );
}