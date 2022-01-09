
import { useState } from "react";
import { Grid, Typography, makeStyles, Button, Paper } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { convertCompanyName, clientStatusFormater } from '../../../../services/globalServices'
import apiEndpoints from "../../../../services/apiEndpoints";
import useFetchGet from "../../../../hooks/useFetchGet";
import CompanyAddresses from './CompanyAddress/CompanyAddresses'
import ContactList from './ContactsTable/ContactsTable'

import MainClientInfo from './MainClientInfo/MainClientInfo'
import ClientInfoMenu from './ClientInfoMenu/ClientInfoMenu'
import ClientInvoices from './ClientInvoices';
import InvoicesTable from "../../Invoices/InvoiceTable/InvoicesTable";


const useStyles = makeStyles(theme => ({

    header: {
        textAlign: 'center',
        backgroundColor: '#BBC1B4',
        borderRadius: 10,
        display: 'flex'
    },
    container: {
        marginTop: theme.spacing(10)
    },
    body: {
        padding: theme.spacing(3),
        backgroundColor: '#F1F3EF'
    },


    title: {
        minWidth: '100%',
        minHeight: '100px',
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },
    contactList: {
        minWidth: '100%',
        minHeight: '100px',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: theme.spacing(3),
        marginTop: theme.spacing(20)
    },

    controls: {
        marginTop: '1%',
        position: 'relative',
        paddingTop: '2%',
        display: 'flex',
        justifyContent: 'center'


    },
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },



}))


export default function ClientInfo(props) {
    const clientId = props.match.params['clientId']
    const [selectedMenu, setSelectedMenu] = useState('Invoices')
    const [clientInfo, setClientInfo] = useState({})

    function changePageHandler(e, menuName) {
        setSelectedMenu(menuName);
    }



    const [getClientInfoTriger, setgetClientInfoTriger] = useState(true)
    let getClientInfoUrl = apiEndpoints.getClientInfo + `/${clientId}`;
    useFetchGet(getClientInfoUrl, setClientInfo, getClientInfoTriger, setgetClientInfoTriger);




    const classes = useStyles();
    
    return (
        <>
            <Paper className={classes.pageContent}>
                <MainClientInfo
                    clientInfo={clientInfo}
                />
                <div style={{ display: 'inline-flex' }}>
                    <ClientInfoMenu
                        changePageHandler={changePageHandler}
                    />

                    {
                        {

                            'Invoices':
                                <div></div>
                            ,
                            'CompanyAddresses':
                                <CompanyAddresses clientId={clientId} />
                            ,
                            'ContactList':
                                <ContactList clientId={clientId}></ContactList>


                        }[selectedMenu]
                    }



                </div>


            </Paper>


        </>

    )
}
