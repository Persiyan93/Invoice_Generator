
import ClientMenu from './NavigationMenu/ClientMenu'
import ArticleMenu from './NavigationMenu/ArticleMenu'
import InvoiceMenu from './NavigationMenu/InvoiceMenu'
import { AppBar, Badge, Grid, IconButton, Toolbar ,makeStyles} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles=makeStyles({
    root:{
        backgroundColor:'#379683'
    }
})


const Header = (props) => {
    const classes=useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item md={4}  >
                        <ClientMenu />

                    </Grid>
                    <Grid item md={4}  >
                        <ArticleMenu />

                    </Grid>
                    <Grid item md={3}  >
                        <InvoiceMenu />

                    </Grid>
                    <Grid item md={1}>
                        <IconButton>
                            <Badge color="secondary" badgeContent={4}>
                                <EmailIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNewIcon  fontSize="small" />

                        </IconButton>
                    </Grid>

                </Grid>
            </Toolbar>

        </AppBar>

    )
}

export default Header

