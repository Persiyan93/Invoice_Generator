import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import {Route,Switch,Redirect} from'react-router-dom'
import { Fragment } from 'react';
import Home from './components/Main/Home/Home'
import NewInvoice from './components/Main/NewInvoice/NewInvoice'
import InvoiceList from './components/Main/InvoiceList/IvoiceList'
import Error from './components/Main/Error/Error'
import DataTable from './components/Main/DataTable/DataTable';
import AddClient from './components/Main/Clients/AddClient/AddClient'
import { Divider } from '@material-ui/core';


function App() {
  return (
    <Fragment>
        <Header/>

        <div className='Container'>
        <Switch>    
            <Route path="/"exact component={Home}/>
            <Route path="/NewInvoice" component={NewInvoice}/>
            <Route path="/InvoiceList" component={InvoiceList}/>
            <Route path="/AddClient" component={AddClient}/>

            <Route component={Error}/>



        </Switch>



        </div>

      </Fragment>

    
        
       
       
     
    
  )
}

export default App;
