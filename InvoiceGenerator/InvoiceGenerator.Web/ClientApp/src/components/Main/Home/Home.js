import HomeGuests from './HomeGuests';
import HomeRegisteredUser from './HomeRegisteredUser'

function Home(props) {
    let { user } = props
    if (user.isAuthenticated) {
        return (<HomeRegisteredUser />)
    }
    else {

        return (<HomeGuests />)
    }
}



export default Home;