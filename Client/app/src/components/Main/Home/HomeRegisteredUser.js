import { useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';

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
import InvoiceIncomesBarCharts from './InvoiceIncomesBarCharts'
import { makeStyles, useTheme, Grid } from '@material-ui/core/';
import AddButton from './AddButton';
import CustomBox from './CustomBox';
import DrawerMenu from './DrawerMenu'
import TopArticles from './TopArticles';

const drawerWidth = 240;
const SCREEN_HEIGHT = window.innerHeight - 50;
const SCREEN_WIDTH=window.innerWidth-600;
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
        maxWidth:'100%',
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    table: {
        margin: theme.spacing(0)
    }
}));

function HomeRegisteredUser(props) {

    const [tablePositionn, setTablePositionn] = useState({x:0,y:100})
    const tablePosition = useDrag((params) => {
        
        const yPosition = params.xy[1];
        const xPosition = params.xy[0];
        console.log(yPosition);
        console.log(xPosition)
        console.log(parseInt(xPosition)<=parseInt(SCREEN_WIDTH))
        if (parseInt(yPosition) >= 0 && yPosition <= parseInt(SCREEN_HEIGHT) &&xPosition>=0&&parseInt(xPosition)<=parseInt(SCREEN_WIDTH)) {
            console.log( 'Y position:    '+yPosition);
            console.log( 'X position   : '+xPosition)
            setTablePositionn({
                x: xPosition,
                y: yPosition
            })

        }
        // else{
        //     console.log(params.initial)
        //     setTablePositionn({
        //         x: params.initial[0],
        //         y: params.initial[1]
        //     })
        // }

    });
    const [isOpenControlPanel, setOpenControlPanel] = useState(false);
    const [userHomePageContent, setUserHomePageContent] = useState([]);
    const [selectedContentId, selectContentId] = useState('');


    //Get user home page content
    const [getUserHomepageContentTriger, setGetUserHomepageContentTriger] = useState(true)
    useFetchGet(apiEndpoints.getUserHomePageContent, setUserHomePageContent, getUserHomepageContentTriger, setGetUserHomepageContentTriger);


    //Delete  selected content from home page
    const [deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger] = useState(false);
    let deleteContentFromHomePageUrl = apiEndpoints.deleteContentFromHomePage + `/${selectedContentId}`;
    useFetchDelete(deleteContentFromHomePageUrl, undefined, deleteContentFromHomePageTriger, setDeleteContentFromHomePageTriger, actionAfterSuccessfullyDeleteContent)

    function actionAfterSuccessfullyDeleteContent() {
        setUserHomePageContent(prevState => ([...prevState.filter(x => x.id != selectedContentId)]));

    }
    function removeContentFromHomePageHandler(e, contentId) {
        console.log('Inside remove content')
        selectContentId(contentId);
        setDeleteContentFromHomePageTriger(true);
    }

    const classes = useStyles();


    function clickHandler() {
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
                        {userHomePageContent.map(content => (


                            {

                                'Top clients for last month':
                                    <div className={classes.table}>
                                        <CustomBox

                                            content={content}
                                            removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                        >
                                            <TopClients />
                                        </CustomBox>
                                    </div>
                                ,
                                'Top articles for last month':
                                    <div className={classes.table}>
                                        <CustomBox
                                            className={classes.table}
                                            content={content}
                                            removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                        >
                                            <TopArticles />
                                        </CustomBox>
                                    </div>,
                                'Incomes for last 12 months':
                                    <div className={classes.table} >
                                        <CustomBox
                                            className={classes.table}
                                            content={content}
                                            removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                        >
                                            <InvoiceIncomesBarCharts />
                                        </CustomBox>
                                    </div>,

                            }[content.name]

                        ))}





                    </>






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



export default HomeRegisteredUser;