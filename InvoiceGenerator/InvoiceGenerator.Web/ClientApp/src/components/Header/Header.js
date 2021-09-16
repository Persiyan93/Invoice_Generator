
import { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import IdentityContext from '../../Context/IdentityContext'
import NavigationMenu from './NavigationMenu'
import { AppBar, Badge, Grid, IconButton, Toolbar, makeStyles } from '@material-ui/core'
import DraftsIcon from '@material-ui/icons/Drafts';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import HomeIcon from '@material-ui/icons/Home';
import Notification from './Notifications/Notification'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import apiEndpoints from '../../services/apiEndpoints'
import useFetchGet from '../../hooks/useFetchGet'
import useFetchPost from '../../hooks/useFetchPost'


const useStyles = makeStyles({
    root: {
        backgroundColor: '#379683'

    },
    identityHandler: {
        width: '100%',
        justifyContent: "space-arround",
        listStyle: 'none'
    },
    identityElement: {
        display: 'flex',
        color: '#fff',
        float: 'right',
        marginLeft: '2%',
        fontSize: '15px',
        fontWeight: '550',
        cursor: 'pointer'

    },
    homeElement: {
        display: 'inline',
        maxidth: '10%',
        color: '#fff',
        fontSize: '15px',
        fontWeight: '550',
        cursor: 'pointer'
    }


})

const clientMenuMembers = [
    { name: 'Нов клиент', url: '/Clients/NewClient', icon: <FiberNewIcon fontSize="small" /> },
    { name: 'Всички', url: '/Clients/All', icon: <DraftsIcon fontSize="small" /> },

]
const productsMenuMembers = [
    { name: 'Нов продукт', url: '/Products/NewProduct', icon: <FiberNewIcon fontSize="small" /> },
    { name: 'Всички', url: '/Products/All', icon: <DraftsIcon fontSize="small" /> }
]
const invoiceMenuMembers = [
    { name: 'Новa фактура', url: '/Invoices/NewInvoice', icon: <FiberNewIcon fontSize="small" /> },
    { name: 'Всички', url: '/Invoices/All', icon: <DraftsIcon fontSize="small" /> }
]
const settingsMenuMembers = [
    { name: 'Нов служител', url: '/Users/CreateUser', icon: <FiberNewIcon fontSize="small" /> },
    { name: 'Всички служители', url: '/Users/All', icon: <DraftsIcon fontSize="small" /> },
    { name: 'История', url: '/History', icon: <DraftsIcon fontSize="small" /> },
    { name: 'Настройки', url: '/Settings', icon: <DraftsIcon fontSize="small" /> },
    { name: 'Банка', url: '/BankAccount', icon: <DraftsIcon fontSize="small" /> },
]

const Header = (props) => {
    const { user, setUser } = useContext(IdentityContext)
    let history = useHistory();


    //States related with notifications
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);


    const [getNotificationsTriger, setGetNotificationsTriger] = useState(false);
    useFetchGet(apiEndpoints.getUnreadNotifications, setNotifications, getNotificationsTriger, setGetNotificationsTriger);

    //Logout user request
    const [logoutUser, setLogoutUser] = useState(false);
    useFetchPost(apiEndpoints.logoutUser, undefined, logoutUser, setLogoutUser);



    useEffect(() => {
        if (user.isAuthenticated) {
            const id = setInterval(() => {
                setGetNotificationsTriger(true)
            }, 60000);
            return () => clearInterval(id);
        }

    }, [user.isAuthenticated]);



    function openNotificationHandler() {
        setNotificationOpen(true);
    }

    function logOut() {
        setLogoutUser(true);
        setUser({ isAuthenticated: false, permissions: [] })
        history.push('/Identity/Login')
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
                    {user.isAuthenticated ?
                        (
                            <Grid container alignItems="center" justifyContent='space-between' >
                                <Grid item md={2}  >
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <IconButton style={{ cursor: "pointer", float: "left" }} >
                                            <HomeIcon htmlColor='black' style={{ fontSize: '30px' }} />
                                        </IconButton>
                                    </Link>
                                </Grid>
                                <Grid item md={2}  >
                                    <NavigationMenu
                                        menuName='Клиенти'
                                        menuMembers={clientMenuMembers}
                                    />

                                </Grid>
                                <Grid item md={2}  >
                                    <NavigationMenu
                                        menuName='Продукти'
                                        menuMembers={productsMenuMembers}
                                    />

                                </Grid>
                                {user.permissions.invoiceAccess &&

                                    <Grid item md={2}  >
                                        <NavigationMenu
                                            menuName='Фактури'
                                            menuMembers={invoiceMenuMembers}
                                        />

                                    </Grid>

                                }


                                <Grid item md={2}  >
                                    <NavigationMenu
                                        menuName='Настройки'
                                        menuMembers={settingsMenuMembers}
                                    />

                                </Grid>
                                <Grid item md={2}>
                                    {/* <IconButton>
                                    <Badge color="secondary" badgeContent={4}>
                                        <EmailIcon fontSize="small" />
                                    </Badge>
                                </IconButton> */}
                                    <IconButton onClick={logOut} style={{ float: 'right' }}>
                                        <PowerSettingsNewIcon fontSize="small" />

                                    </IconButton>
                                    <IconButton
                                        style={{ float: 'right' }}
                                        onClick={openNotificationHandler}>
                                        <Badge color="secondary" badgeContent={notifications.length}>
                                            <NotificationsIcon fontSize="small" />
                                        </Badge>
                                    </IconButton>

                                </Grid>

                            </Grid>
                        )
                        :
                        (
                            <ul className={classes.identityHandler}>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <li className={classes.homeElement} >Начало</li>
                                </Link>
                                <Link to="/Identity/Login" style={{ textDecoration: 'none' }}>
                                    <li className={classes.identityElement} >Вход</li>
                                </Link>
                                <Link to="/Identity/Register" style={{ textDecoration: 'none' }}>
                                    <li className={classes.identityElement} >Регистрация</li>
                                </Link>
                            </ul>

                        )}
                </Toolbar>




            </AppBar >



        </>

    )
}

export default Header

