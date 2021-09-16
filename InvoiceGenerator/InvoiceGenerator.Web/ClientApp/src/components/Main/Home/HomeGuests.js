import BackgroundImage from '../../../resources/homeBackgroundImage.jpg'
import { makeStyles, } from '@material-ui/core/';
import { Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    backgroundImage: {
        backgroundImage: `url(${BackgroundImage})`,
        position: 'fixed',
        minHeight: '100%',
        minWidth: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat'

    },

    pageTitle: {
        borderRadius: 10,
        marginLeft: '15%',
        marginRight: '15%',
        paddingBottom: '10px',
        zPostion: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 0.95,
        fontSize: '3em',
       
        textAlign: 'center'

    },
    h1: {
        opacity: 0.95,
        color: '#ffffff',
        fontWeight: 550,
        lineHeight: 1

    },
    buttonHandler: {

    },
    button: {
        backgroundColor: '#379683',
        marginBottom: '10px',
        color: '#fff',
        padding: '10px',
        fontSize: '25px',
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: '550',
        margin: 'auto',
        display: 'table',
        cursor: 'pointer'
    }

}));

function HomeGuests(props) {
     const classes = useStyles();
    return (

        <div className={classes.backgroundImage}>
            <div className={classes.pageTitle}>
                <h1 className={classes.h1}>Безплатно онлайн фактуриране</h1>
                <Link to="/Identity/Register" style={{ textDecoration: 'none' }}>
                    <div className={classes.button}>
                        Безплатна регистрация
                    </div>
                </Link>
            </div>

        </div>

    )
}

export default HomeGuests;