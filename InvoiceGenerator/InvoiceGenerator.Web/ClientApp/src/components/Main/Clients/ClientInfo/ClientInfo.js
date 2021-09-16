
import { useState } from "react";
import { Grid, Typography, makeStyles, Button, Paper } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { convertCompanyName, clientStatusFormater } from '../../../../services/globalServices'
import apiEndpoints from "../../../../services/apiEndpoints";
import useFetchGet from "../../../../hooks/useFetchGet";
import AddressInfoCard from './AdditionalClientInfo/AddressInfoCard'
import ContactList from './ContactsTable/ContactsTable'
import AdditionalClientInfo from "./AdditionalClientInfo/AdditionalClientInfo";

import ClientInvoices from "./ClientInvoices";


const useStyles = makeStyles(theme => ({

    header: {
        textAlign: 'center',
        // backgroundColor: '#EAF0E3',
        // /backgroundColor: '#D3D9CC',
        backgroundColor: '#BBC1B4',
        borderRadius: 10,
        display: 'flex'
    }
    , container: {
        // height: '300px',
        // width: '650px'
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

    const [clientInfo, setClientInfo] = useState({});
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
    const [showContactList, setShowContactList] = useState(false)
    const [showInvoices, setShowInvoices] = useState(true)


    const [getClientInfoTriger, setgetClientInfoTriger] = useState(true)
    let getClientInfoUrl = apiEndpoints.getClientInfo + `/${clientId}`;
    useFetchGet(getClientInfoUrl, setClientInfo, getClientInfoTriger, setgetClientInfoTriger);


    function showAdditionalInfoHandler(e) {
        setShowAdditionalInfo(prevState => (!prevState));
    }
    function showInvoicesHandler(e) {
        setShowInvoices(prevState => (!prevState));
    }


    function showContactListHandler(e) {
        setShowContactList(prevState => (!prevState));
    }
    console.log(showContactList)
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.pageContent}>
                <div className={classes.title}>
                    <Grid container >
                        <Grid item md={12} align="center" >
                            <Typography variant='h4'>Данни на фирмата </Typography>
                        </Grid>
                    </Grid>


                    <Grid container alignItems="center" justifyContent={true}>
                        <Grid item md={1} />

                        <Grid item md={2}>

                            <Typography variant='h6'>
                                Име на фирмата
                            </Typography>
                            <Typography color="textSecondary">
                                {convertCompanyName(clientInfo)}
                            </Typography>
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={1}>

                            <Typography variant='h8'>
                                Просрочени фактури
                            </Typography>
                            <Typography color="textSecondary">
                                {clientInfo.countOfOverdueInvoices}
                            </Typography>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={1}>
                            <Typography variant='h8'>
                                Статус
                            </Typography>
                            <Typography color="textSecondary">
                                {clientStatusFormater(clientInfo.status)}
                            </Typography>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={1}>

                            <Typography variant='h8'>
                                Неплатени фактури
                            </Typography>
                            <Typography color="textSecondary">
                                {clientInfo.countOfUnpaidInvoices}
                            </Typography>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={1}>

                            <Typography variant='h6'>
                                ДДС Номер
                            </Typography>
                            <Typography color="textSecondary">
                                {clientInfo.vatNumber}
                            </Typography>
                        </Grid>
                    </Grid>

                </div>

                {/*  Invoices */}
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Grid container align='center'>
                            <Grid item md={11}>
                                <Typography variant='h4'>Фактури на клиента</Typography>
                            </Grid>
                            <Grid item align='right'>
                                <ImportExportIcon
                                    style={{ width: "100%", cursor: "pointer", float: "right" }}
                                    onClick={showInvoicesHandler}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.body}>
                        {
                            showInvoices &&
                            <ClientInvoices
                                clientId={clientId}
                                history={props.history}
                            ></ClientInvoices>
                        }

                    </div>
                </div>
                {/* Contact list */}
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Grid container align='center'>
                            <Grid item md={11}>
                                <Typography variant='h4'>Лица за контакт</Typography>
                            </Grid>
                            <Grid item align='right'>
                                <ImportExportIcon
                                    style={{ width: "100%", cursor: "pointer", float: "right" }}
                                    onClick={showContactListHandler}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.body}>
                        {
                            showContactList &&
                            <ContactList clientId={clientId}  ></ContactList>
                        }

                    </div>
                </div>

                {/* Additional Info */}
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Grid container align='center'>
                            <Grid item md={11}>
                                <Typography variant='h4'>Допълнителна информация</Typography>
                            </Grid>
                            <Grid item align='right'>
                                <ImportExportIcon
                                    style={{ width: "100%", cursor: "pointer", float: "right" }}
                                    onClick={showAdditionalInfoHandler}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.body}>
                        {
                            showAdditionalInfo &&
                            <AdditionalClientInfo clientId={clientId} ></AdditionalClientInfo>
                        }

                    </div>
                </div>























            </Paper>


        </>

    )
}
