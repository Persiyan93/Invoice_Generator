import { useState } from 'react';
import { useDrag } from 'react-use-gesture';
import useFetchGet from '../../../hooks/useFetchGet';
import useFetchDelete from '../../../hooks/useFetchDelete';
import apiEndpoints from '../../../services/apiEndpoints';
import { CssBaseline, Drawer, Hidden, makeStyles } from '@material-ui/core/';
import TopClients from './Statistics/TopClients';
import Popup from '../../Elements/Popup';
import ListWithContentTypes from './ListWithContentTypes';
import InvoiceIncomesBarCharts from './Statistics/InvoiceIncomesBarCharts'
import CustomBox from './CustomBox';
import DrawerMenu from './DrawerMenu'
import TopArticles from './Statistics/TopArticles';

const drawerWidth = 240;
const SCREEN_HEIGHT = window.innerHeight - 50;
const SCREEN_WIDTH = window.innerWidth - 600;
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

    toolbar: {
        padding: theme.spacing(2)
    },
    drawerPaper: {
        marginTop: '85px',
        display: 'relative',
        width: drawerWidth,

    },
    content: {
        display: 'inline-block',
        maxWidth: '100%',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: theme.spacing(2),
    },

}));

function HomeRegisteredUser(props) {

    const [logoPosition, setLogoposition] = useState({ x: 0, y: 100 })
    const bindLogoPos = useDrag((params) => {
        let xPosition = params.offset[0]
        let yPosition=params.offset[1]
        setLogoposition({
            x: params.offset[0],
            y:params.offset[1]
        })
        if (parseInt()) {

        }

        //const yPosition = params.xy[1];
        //const xPosition = params.xy[0];
        //console.log(yPosition);
        //console.log(xPosition)
        //console.log(parseInt(xPosition) <= parseInt(SCREEN_WIDTH))
        //if (parseInt(yPosition) >= 0 && yPosition <= parseInt(SCREEN_HEIGHT) && xPosition >= 0 && parseInt(xPosition) <= parseInt(SCREEN_WIDTH)) {
        //    console.log('Y position:    ' + yPosition);
        //    console.log('X position   : ' + xPosition)
        //    setTablePositionn({
        //        x: xPosition,
        //        y: yPosition
        //    })

        //}


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
        selectContentId(contentId);
        setDeleteContentFromHomePageTriger(true);
    }

    function clickHandler() {
        setOpenControlPanel(true)
    }

    const classes = useStyles();
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




                    {userHomePageContent.map(content => (


                        {

                            'Top clients for last month':

                                <div {...bindLogoPos()} style={{ position: 'relative', top: logoPosition.y, left: logoPosition.x}}>
                                <CustomBox
                                    containerHeight={100}
                                    containerWidth={630}
                                    key={content.name}
                                    content={content}
                                    removeContentFromHomePageHandler={removeContentFromHomePageHandler}
                                >
                                    <TopClients />
                                    </CustomBox>
                           </div>

                            ,
                            'Top articles for last month':
                                <CustomBox
                                    containerHeight={100}
                                    containerWidth={590}
                                    key={content.name}
                                    content={content}
                                    removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                >
                                    <TopArticles />
                                </CustomBox>,

                            'Incomes for last 12 months':
                                <CustomBox
                                    containerHeight={100}
                                    containerWidth={450}
                                    key={content.name}
                                    content={content}
                                    removeContentFromHomePageHandler={removeContentFromHomePageHandler}

                                >
                                    <InvoiceIncomesBarCharts />
                                </CustomBox>
                            ,

                        }[content.name]

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



export default HomeRegisteredUser;