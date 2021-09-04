import HomeGuest from './HomeGuest';
import HomeRegisteredUser from './HomeRegisteredUser'
import { makeStyles, useTheme, Grid } from '@material-ui/core/';
import AddButton from './AddButton';
import CustomBox from './CustomBox';
import DrawerMenu from './DrawerMenu'
import TopArticles from './TopArticles';

const drawerWidth = 240;
const SCREEN_HEIGHT = window.innerHeight - 50;
const SCREEN_WIDTH = window.innerWidth - 600;
const useStyles = makeStyles((theme) => ({

}));

function Home(props) {
    let { user } = props

   if (user.isAuthenticated){
    return (<HomeRegisteredUser/>)
   }
   else{
    return (<HomeGuest/>)
   
   }
}



export default Home;