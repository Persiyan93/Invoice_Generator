
import './App.css';
import React, { useContext, useState, useEffect, } from 'react'
import { useHistory } from 'react-router'
import * as  cookieService from './services/cookieService';
import * as dataService from './services/dataService'
import apiEndpoints from './services/apiEndpoints';
import IdentityContext from './Context/IdentityContext';
import NotificationContext from './Context/NotificationContext';
import Header from './components/Header/Header';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Fragment } from 'react';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import Home from './components/Main/Home/Home'
import NewInvoice from './components/Main/NewInvoice/NewInvoice'
import Error from './components/Main/Error/Error'
import ProductInputForm from './components/Main/Products/Articles/ProuctInputForm';
import AddClient from './components/Main/Clients/AddClient/AddClient'
import { CssBaseline, } from '@material-ui/core';
import Footer from './components/Footer/Footer';
import ClientInfo from './components/Main/Clients/ClientInfo/ClientInfo'
import ClientList from './components/Main/Clients/ClientList/ClientList';
import ConnectionError from './components/Main/Error/ConnectionError'
import LoginForm from './components/Identity/LoginForm';
import RegisterForm from './components/Identity/Register/RegisterForm';
import NewServiceInputFrom from './components/Main/Products/Services/NewServiceInputForm';
import NewArticleInputForm from './components/Main/Products/Articles/NewArticleInputForm';
import ProductTable from './components/Main/Products/Articles/ProductTable';
import CreateUser from './components/Main/Users/CreateUser/CreateUser';
import NewPassword from './components/Identity/NewPassword'
import AllUsers from './components/Main/Users/AllUsers';
import History from './components/Main/History/History';
import BasicAlert from './components/Main/Elements/BasicAlert'
import Testpage from './components/Main/Elements/Testpage'
import CompanySettings from './components/Main/CompanySettings/CompanySettings';
import InvoicesTable from './components/Main/InvoiceList/InvoicesTable'
import { getCookieValue } from './services/cookieService'
import { CompassCalibrationOutlined } from '@material-ui/icons';
import InvoiceRoutes from './components/Routes/InvoiceRoutes'
import CompanyRoutes from './components/Routes/CompanyRoutes'
import EmailRoutes from './components/Routes/EmailRoutes'
import ProductRoutes from './components/Routes/ProductRoutes'




function App() {
  const history = useHistory();
  const [user, setUser] = useState({ isAuthenticated: false, permissions: [] })
  const [isBusy, setBusy] = useState(true)
  const [notification, setNotification] = useState({ isOpen: false, message: '' })





  useEffect(() => {
    console.log('Inside useEffect')
    dataService.get(apiEndpoints.getUserInfo)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.status == "Unsuccessful") {
          if (res.message == 'Not authorized') {
            setUser({ isAuthenticated: false, permissions: [] })

          }
        }
        else {
        console.log({...res.accessAreas});
        setUser({ isAuthenticated: true, permissions: { ...res.accessAreas } })

        }
        setBusy(false)
      })
      .catch(err => {
        console.log(err)


      })

  }, [])

  setTimeout(undefined, 30)
  return (

    <Fragment>
      <NotificationContext.Provider value={{ notification, setNotification }}>
        <IdentityContext.Provider value={{ user, setUser }}>

          {

            !isBusy &&
            <>
              <Header />
              <BasicAlert
                notification={notification}
                setNotification={setNotification}
              />

              <div className='Container'  >



                <Switch>
                  <Route path="/Identity/Login" exact component={LoginForm} />
                  <Route path="/Identity/Register" exact component={RegisterForm} />

                  <PrivateRoutes user={user} path="/" exact component={Home} />
                  <PrivateRoutes user={user} path="/Clients/NewClient" component={AddClient} />
                  <PrivateRoutes user={user} path="/Clients/All" component={ClientList} />
                  <PrivateRoutes user={user} path="/Clients/ClientInfo/:clientId" component={ClientInfo} />
                 

               
                

                  <InvoiceRoutes user={user} path="/Invoices/All" component={InvoicesTable} />
                  <InvoiceRoutes user={user} path="/Invoices/Edit/:invoiceId" component={NewInvoice} />
                  <InvoiceRoutes user={user} path="/Invoices/NewInvoice/:invoiceId?" component={NewInvoice} />
                 
                  <CompanyRoutes user={user} path="/Users/CreateUser" component={CreateUser} />
                  <CompanyRoutes user={user} path="/Users/NewPassword/:email/:token" component={NewPassword} />
                  <CompanyRoutes user={user} path="/Users/All/" component={AllUsers} />
                  <CompanyRoutes user={user} path="/History/" component={History} />
                  <CompanyRoutes user={user} path="/Settings/" component={CompanySettings} />


                  <ProductRoutes user={user} path="/Products/NewProduct" exact component={ProductInputForm} />
                  <ProductRoutes user={user} path="/Products/NewProduct/NewService" component={NewServiceInputFrom} />
                  <ProductRoutes user={user} path="/Products/NewProduct/NewArticle" component={NewArticleInputForm} />
                  <ProductRoutes user={user} path="/Products/All" component={ProductTable} />


               
                 
                  
                  
                 
           
                

                  
                 


                  <Route path="/Errors/ConnectionError" component={ConnectionError} />
                  
                
                  
               
                  <Route component={Error} />



                </Switch>

              </div>
              <Footer />
            </>

          }



        </IdentityContext.Provider>
      </NotificationContext.Provider >
      <CssBaseline />
    </Fragment >










  )
}

export default App;
