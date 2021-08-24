
import { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as cookieService from '../../services/cookieService'
import IdentityContext from '../../Context/IdentityContext'
import ClientMenu from './NavigationMenu/ClientMenu'
import ArticleMenu from './NavigationMenu/ArticleMenu'
import InvoiceMenu from './NavigationMenu/InvoiceMenu'
import UsersMenu from './NavigationMenu/UsersMenu'
import { AppBar, Badge, Grid, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import apiEndpoints from '../../services/apiEndpoints'
import useFetchGet from '../../hooks/useFetchGet'
import useFetchPut from '../../hooks/useFetchPut'
import HomeIcon from '@material-ui/icons/Home';
import Notification from './Notifications/Notification'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#379683'
        //backgroundColor:'#919392'
    }
})


const Header = (props) => {
    const { user, setUser } = useContext(IdentityContext)
    let history = useHistory();

    //States related with notifications
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);


    const [getNotificationsTriger, setGetNotificationsTriger] = useState(true);
    useFetchGet(apiEndpoints.getUnreadNotifications, setNotifications, getNotificationsTriger, setGetNotificationsTriger);


    useEffect(() => {
        const id = setInterval(() => {
            
            setGetNotificationsTriger(true)
        }
            , 200000);

        return () => clearInterval(id);
    }, []);



    function openNotificationHandler() {
        setNotificationOpen(true);
    }
    function logOut() {

        cookieService.deleteCookieValue();
        history.push('/Identity/Login')
        setUser({ isAuthenticated: false, permissions: [] })
        console.log(cookieService.getCookieValue())

    }
    const classes = useStyles();
    return (
        <>
            <Notification
                isNotificationsOpen={isNotificationOpen}
                setNotificationsOpen={setNotificationOpen}
                notifications={notifications}
                setNotifications={setNotifications}

            ></Notification>
            < AppBar position="static" className={classes.root} >



                <Toolbar>
                    {user.isAuthenticated &&
                        <Grid container alignItems="center" justifyContent='space-between' >
                            <Grid item md={1}  >
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <IconButton style={{ width: "%", cursor: "pointer", float: "left" }} >
                                        <HomeIcon htmlColor='black' size='large' />
                                    </IconButton>
                                </Link>
                            </Grid>
                            <Grid item md={2}  >
                                <ClientMenu />

                            </Grid>
                            <Grid item md={2}  >
                                <ArticleMenu />

                            </Grid>
                            {user.permissions.invoiceAccess &&

                                <Grid item md={2}  >
                                    <InvoiceMenu />

                                </Grid>

                            }


                            <Grid item md={2}  >
                                <UsersMenu />

                            </Grid>
                            <Grid item md={2}>
                                <IconButton>
                                    <Badge color="secondary" badgeContent={4}>
                                        <EmailIcon fontSize="small" />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    onClick={openNotificationHandler}>
                                    <Badge color="secondary" badgeContent={notifications.length}>
                                        <NotificationsIcon fontSize="small" />
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={logOut}>
                                    <PowerSettingsNewIcon fontSize="small" />

                                </IconButton>
                            </Grid>

                        </Grid>
                    }
                </Toolbar>




            </AppBar >



        </>

    )
}

export default Header

