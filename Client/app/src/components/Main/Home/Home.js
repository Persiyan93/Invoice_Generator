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
import TopClients from './TopClients';
import Popup from '../Popup'
import ListWithContentTypes from './ListWithContentTypes';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme,Grid  } from '@material-ui/core/';
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
        display: 'inlineBlock',
        flexGrow: 1,
        padding: theme.spacing(3),


    },
}));

function Home(props) {
    const [isOpenControlPanel, setOpenControlPanel] = useState(false);
    const [userHomePageContent, setUserHomePageContent] = useState([]);
    const [selectedContentId, selectContentId] = useState('');

    console.log(userHomePageContent)
    const [getUserHomepageContentTriger, setGetUserHomepageContentTriger] = useState(true)
    useFetchGet(apiEndpoints.getUserHomePageContent, setUserHomePageContent, getUserHomepageContentTriger, setGetUserHomepageContentTriger);

    const [deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger] = useState(false);
    let deleteContentFromHomePageUrl = apiEndpoints.deleteContentFromHomePage + `/${selectedContentId}`;
    useFetchDelete(deleteContentFromHomePageUrl, undefined, deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger, actionAfterSuccessfullyDeleteContent)

    function actionAfterSuccessfullyDeleteContent() {
        setUserHomePageContent(prevState => ([...prevState.filter(x => x.id != selectedContentId)]));

    }
    function removeContentFromHomePageHandler(e, contentId) {
        selectContentId(contentId);
        setDeleteContentFromHomePageTriger(true);
    }

    const classes = useStyles();

    function renderSwitch(param) {
        switch (param) {
            case 'foo':
                return 'bar';
            default:
                return 'foo';
        }
    }
    function clickHandler(){
        setOpenControlPanel(true)
    }


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
                            <DrawerMenu clickHandler={clickHandler} />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>


                    <>
                        <Grid container>
                            <Grid item md={6}>
                                <CustomBox
                            
                                    content='Най продавани артикули за последния месец'
                                    removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                >
                                    <TopArticles></TopArticles>
                                </CustomBox>
                            </Grid>
                            {/* <Grid  item md={6}>
                                <CustomBox
                                    content='Най-добри клиенти за последния месец'
                                    removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                >
                                    <TopClients></TopClients>

                                </CustomBox>
                            </Grid> */}


                        </Grid>

                    


                    </>




                    {/* <AddButton
                        setOpenControlPanel={setOpenControlPanel}
                    /> */}

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