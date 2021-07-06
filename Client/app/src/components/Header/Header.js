
import ClientMenu from './NavigationMenu/ClientMenu'
import ArticleMenu from './NavigationMenu/ArticleMenu'
import InvoiceMenu from './NavigationMenu/InvoiceMenu'


const Header=(props)=>{
    return(
    <div  className="Navigation-Menu">

        <InvoiceMenu/>
        <ClientMenu/>
        
        <ArticleMenu/>

    </div>

    )
}

export default Header
