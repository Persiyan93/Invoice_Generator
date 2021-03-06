import { useState, useContext } from 'react';
import useFetchGet from '../../../hooks/useFetchGet';
import useFetchPost from '../../../hooks/useFetchPost';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import NotificationContext from '../../../Context/NotificationContext';
import { Grid, makeStyles, Typography } from '@material-ui/core/';
import apiEndpoints from '../../../services/apiEndpoints';





const useStyles = makeStyles((theme) => ({
    element: {
        borderColor: 'black',
        '&:hover': {
            backgroundColor: '#DAD4D3',
            cursor: 'pointer'
        },
        marginTop: theme.spacing(3),
        height: '70px',
        borderRadius: 5,
        backgroundColor: '#DCDCDC '


    },

}));

function ListWithContentTypes(props) {
    const { setUserHomePageContent, setOpenControlPanel } = props

    const [homePageContentTypes, setHomePageContentTypes] = useState([]);
    const [selectedContetTypeId, selectContentTypeId] = useState('');

    const [getHomePageContentTypesTriger, setGetHomePageContentTypesTriger] = useState(true);
    useFetchGet(apiEndpoints.getHomePageContentTtypes, setHomePageContentTypes, getHomePageContentTypesTriger, setGetHomePageContentTypesTriger);

    const [addNewContentToUserHomePageTriger, setAddNetContentToUserHomePageTriger] = useState(false)
    const addNewContentTouserHomePageUrl = apiEndpoints.addNewContentToUserHomepage + `/${selectedContetTypeId}`
    useFetchPost(addNewContentTouserHomePageUrl, undefined, addNewContentToUserHomePageTriger
        , setAddNetContentToUserHomePageTriger, actionAfterSuccessfullyAddNewContent)

    function addContentHandler(e, contentId) {
        selectContentTypeId(contentId)
        setAddNetContentToUserHomePageTriger(true)
    }

    function actionAfterSuccessfullyAddNewContent() {
        setUserHomePageContent(prevState => ([...prevState, ...homePageContentTypes.filter(x => x.id === selectedContetTypeId)]))
        setOpenControlPanel(false);
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            {homePageContentTypes.map(x => (
                <div className={classes.element} key={x.id} onClick={(e) => addContentHandler(e, x.id)} >
                    <Grid container >
                        <Grid itme md={2}>
                            {x.type == 'Chart' ?
                                <EqualizerIcon style={{ fontSize: 70 }}></EqualizerIcon>
                                :
                                <ListAltIcon style={{ fontSize: 70 }}></ListAltIcon>
                            }
                        </Grid>
                        <Grid itme md={10}>

                            <Typography variant="h6" align="center">
                                {x.bulgarianName}
                            </Typography>
                        </Grid>
                    </Grid>

                </div>
            ))}

        </div>
    )
}



export default ListWithContentTypes;