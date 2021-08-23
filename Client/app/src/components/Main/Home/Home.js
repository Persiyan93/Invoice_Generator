import { useState, useEffect } from 'react';
import useFetchGet from '../../../hooks/useFetchGet';
import useFetchDelete from '../../../hooks/useFetchDelete'
import apiEndpoints from '../../../services/apiEndpoints';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Popup from '../Popup'
import ListWithContentTypes from './ListWithContentTypes';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddButton from './AddButton';
import CustomBox from './CustomBox';
import DrawerMenu from './DrawerMenu'
import TopArticles from './TopArticles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',



    },
    drawer: {

        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,


        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    //toolbar: theme.mixins.toolbar,
    toolbar: {
        padding: theme.spacing(2)
    },
    drawerPaper: {
        marginTop: '85px',
        display: 'relative',
        width: drawerWidth,

    },
    content: {
        display: 'block',
        flexGrow: 1,
        padding: theme.spacing(3),


    },
}));

function Home(props) {
    console.log('inside home')
    const [isOpenControlPanel, setOpenControlPanel] = useState(false);
    const [userHomePageContent, setUserHomePageContent] = useState([]);
    const [selectedContentId, selectContentId] = useState('');


    const [getUserHomepageContentTriger, setGetUserHomepageContentTriger] = useState(true)
    useFetchGet(apiEndpoints.getUserHomePageContent, setUserHomePageContent, getUserHomepageContentTriger, setGetUserHomepageContentTriger);

    const [deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger] = useState(false);
    let deleteContentFromHomePageUrl = apiEndpoints.deleteContentFromHomePage + `/${selectedContentId}`;
    useFetchDelete(deleteContentFromHomePageUrl, undefined, deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger,actionAfterSuccessfullyDeleteContent)

    function actionAfterSuccessfullyDeleteContent(){
        setUserHomePageContent(prevState=>([...prevState.filter(x=>x.id!=selectedContentId)]));
        
    }
    function removeContentFromHomePageHandler(e,contentId){
        selectContentId(contentId);
        setDeleteContentFromHomePageTriger(true);
    }
    
    const classes = useStyles();



    console.log(userHomePageContent)


    return (
        <>
            <div className={classes.root}>
                <CssBaseline />

                <nav className={classes.drawer} aria-label="mailbox folders">

                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <DrawerMenu />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <AddButton
                        setOpenControlPanel={setOpenControlPanel}
                    />
                    {
                        userHomePageContent.map((content) => (
                            <CustomBox
                                key={content.id}
                                content={content}
                                removeContentFromHomePageHandler={ removeContentFromHomePageHandler}

                            >
                                <TopArticles></TopArticles>
                            </CustomBox>

                        ))}




                </main>
            </div>
            <Popup
                setOpenPopup={setOpenControlPanel}
                openPopup={isOpenControlPanel}
                title='Списък с показатели '
                width='sm'
            >

                <ListWithContentTypes
                    setUserHomePageContent={setUserHomePageContent}
                    setOpenControlPanel={setOpenControlPanel}
                >

                </ListWithContentTypes>

            </Popup>
        </>

    );
}



export default Home;