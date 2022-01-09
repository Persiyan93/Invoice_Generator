import './App.css';
import React, { useContext, useState, useEffect, } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as dataService from './services/dataService'
import apiEndpoints from './services/apiEndpoints';
import IdentityContext from './Context/IdentityContext';
import NotificationContext from './Context/NotificationContext';
import Header from './components/Header/Header';
import Home from './components/Main/Home/Home';
import LoginForm from './components/Main/Identity/Login/LoginForm';
import RegisterForm from './components/Main/Identity/Register/RegisterForm';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import CompanyRoutes from './components/Routes/CompanyRoutes';
import ProductRoutes from './components/Routes/ProductRoutes';
import InvoiceRoutes from './components/Routes/InvoiceRoutes';
import GuestRoutes from './components/Routes/GuestRoutes';
import AddClient from './components/Main/Clients/NewClientForm';
import ClientInfo from './components/Main/Clients/ClientInfo/ClientInfo';
import ClientList from './components/Main/Clients/ListWithClients/ClientsTable';
import { CssBaseline, } from '@material-ui/core';
import NewProduct from './components/Main/Products/NewProduct'
import NewServiceInputFrom from './components/Main/Products/Services/NewServiceInputForm';
import NewArticleInputForm from './components/Main/Products/Articles/NewArticleInputForm';
import ProductsTable from './components/Main/Products/ProductsTable';
import InvoicesTable from './components/Main/Invoices/InvoiceTable/InvoicesTable';
import AllUsers from './components/Main/Company/Users/UsersTable';
import CreateUser from './components/Main/Company/Users/AddUserInputForm';
import BankAccountSettings from './components/Main/Company/Bank/BankAccountSettings';
import CompanySettings from './components/Main/Company/CompanySettings/CompanySettings';
import CompanyHistoryTable from './components/Main/Company/CompanyHistory/CompanyHistoryTable';
import NewInvoice from './components/Main/Invoices/NewInvoice/NewInvoice'
import BasicAlert from './components/Elements/BasicAlert'


//import Error from './components/Main/Error/Error'
//import ConnectionError from './components/Main/Error/ConnectionError'
//import NewPassword from './components/Identity/NewPassword'








function App() {
    const [user, setUser] = useState({ isAuthenticated: false, permissions: [] })
    const [isBusy, setBusy] = useState(true)
    const [notification, setNotification] = useState({ isOpen: false, message: '' })

    useEffect(() => {

        dataService.get(apiEndpoints.getUserInfo)
            .then(res => res.json())
            .then(res => {
                if (res.status == "Unsuccessful") {
                    if (res.message == 'Not authorized') {
                        setUser({ isAuthenticated: false, permissions: [] })
                    }

                }
                else {

                    setUser({ isAuthenticated: true, permissions: { ...res.accessAreas } })

                }
                setBusy(false)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])


    return (

        <>
            <NotificationContext.Provider value={{ notification, setNotification }}>
                <IdentityContext.Provider value={{ user, setUser }}>

                    {

                        !isBusy &&
                        <>
                            <Header />

                            <>
                                <div className='background-Div'></div>
                                <div className='Container'>
                                    <BasicAlert
                                        notification={notification}
                                        setNotification={setNotification}
                                    />


                                    <Switch>

                                        <GuestRoutes user={user} path="/Identity/Login" component={LoginForm} />
                                        <GuestRoutes user={user} path="/Identity/Register" component={RegisterForm} />
                                        <Route exact path="/" render={props => <Home user={user} {...props} />} />


                                        <PrivateRoutes user={user} path="/Clients/NewClient" component={AddClient} />
                                        <PrivateRoutes user={user} path="/Clients/All" component={ClientList} />
                                        <PrivateRoutes user={user} path="/Clients/ClientInfo/:clientId" component={ClientInfo} />





                                        <InvoiceRoutes user={user} path="/Invoices/All" component={InvoicesTable} />
                                        <InvoiceRoutes user={user} path="/Invoices/Edit/:invoiceId" component={NewInvoice} />
                                        <InvoiceRoutes user={user} path="/Invoices/NewInvoice/:invoiceId?" component={NewInvoice} />

                                        <CompanyRoutes user={user} path="/Users/CreateUser" component={CreateUser} />
                                        {/*<CompanyRoutes user={user} path="/Users/NewPassword/:email/:token" component={NewPassword} />*/}
                                        <CompanyRoutes user={user} path="/Users/All/" component={AllUsers} />
                                        <CompanyRoutes user={user} path="/History/" component={CompanyHistoryTable} />
                                        <CompanyRoutes user={user} path="/Settings/" component={CompanySettings} />
                                        <CompanyRoutes user={user} path="/BankAccount/" component={BankAccountSettings} />


                                        <ProductRoutes user={user} path="/Products/NewProduct" exact component={NewProduct} />
                                        <ProductRoutes user={user} path="/Products/NewProduct/NewService" component={NewServiceInputFrom} />
                                        <ProductRoutes user={user} path="/Products/NewProduct/NewArticle" component={NewArticleInputForm} />
                                        <ProductRoutes user={user} path="/Products/All" component={ProductsTable} />

                                        {/*<Route path="/Errors/ConnectionError" component={ConnectionError} />*/}




                                        {/*<Route component={Error} />*/}



                                    </Switch>

                                </div>
                            </>


                        </>

                    }



                </IdentityContext.Provider>
            </NotificationContext.Provider >
            <CssBaseline />
        </>










    )
}

export default App;
