
import ClientMenu from './NavigationMenu/ClientMenu'
import ArticleMenu from './NavigationMenu/ArticleMenu'


const Header=(props)=>{
    return(
    <div  className="Navigation-Menu">

        <ClientMenu/>

        <ArticleMenu/>

    </div>

    )
}

export default Header
