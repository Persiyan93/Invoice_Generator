import React from "react";
import { withStyles, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getClientInfo } from "../../../../services/clientsService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { ClientProvider } from "../../../Context";
import { Button } from "@material-ui/core";
import AddressCard from './AddressCard'
import PrintIcon from '@material-ui/icons/Print';
import ContactList from './ContactList'
import AdditionalClientInfo from "./AddtionalClientInfo";



const useStyles = (theme => ({



    hideElement: {
        display: 'none',
    },

    root: {
        minWidth: '100%',
        minHeight: '100px',
        backgroundColor: '#DFC8C3',
        borderRadius: 10
    },

    controls: {
        marginTop: '1%',
        position: 'relative',
        paddingTop: '2%',
        display: 'flex',
        justifyContent: 'center'


    },
    additionalInfo: {
        backgroundColor: '#DFC8C3',
        borderRadius: 10,
        marginTop: '0%'
    }


}))


class ClientInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            clientId: this.props.match.params['clientId'],
            name: '',
            companyType: '',
            vatNumber: '',
            uniqueIdentificationNumber: '',
            countOfAllInvoices:0,
            countOfOverdueInvoices:0,
            invoices: [{ id: 10, number: 243, price: 450.00, dateOfIssue: '20.04.2021', maturityDate: '30.04.2021', createBy: 'Георги Георгиев', status: 'w' }],
            displayAdditionalInfo: false,
            displayContactList: false,
            
            
        };
        this.showAdditionalInfo = this.showAdditionalInfo.bind(this);
        this.showContactList = this.showContactList.bind(this);
    }

    componentDidMount() {

        var response = getClientInfo(this.props.match.params['clientId'])
            .then(resp => {

                if (resp.status != 200) {
                    console.log(resp);

                }
                else {
                    resp.json()
                        .then(clientInfo => {
                            this.setState({ ...clientInfo });


                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))




    }


    showAdditionalInfo(event) {
        this.setState((state) => ({ displayAdditionalInfo: !state.displayAdditionalInfo }))

    }

    showContactList(event) {
        this.setState((state) => ({ displayContactList: !state.displayContactList }))
    }






    render() {
        let { clientId, displayAdditionalInfo, displayContactList } = this.state;
        const { classes } = this.props;


        return (
            <>
                <div className={classes.root}>
                    <Grid container >
                        <Grid item md={12} align="center" >
                            <Typography variant='h4'>Данни на фирмата </Typography>
                        </Grid>
                     </Grid>
                    

                    <Grid container alignItems="center">
                        <Grid item md={2} />
                        <Grid item md={2}>

                            <Typography variant='h6'>
                                Име на фирмата
                            </Typography>
                            <Typography color="textSecondary">
                               {this.state.name}
                            </Typography>
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={1}>

                            <Typography variant='h8'>
                                Просрочени фактури
                            </Typography>
                            <Typography color="textSecondary">
                               {this.state.countOfOverdueInvoices}
                            </Typography>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={1}>

                            <Typography variant='h8'>
                                Всички фактури
                            </Typography>
                            <Typography color="textSecondary">
                                {this.state.countOfAllInvoices}
                            </Typography>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={2}>

                            <Typography variant='h6'>
                                ДДС Номер
                            </Typography>
                            <Typography color="textSecondary">
                                {this.state.vatNumber}
                            </Typography>
                        </Grid>
                    </Grid>

                </div>
                <div className={classes.controls} >

                    <Button variant="contained" size="small" color="primary" onClick={this.showAdditionalInfo}>
                        Допълнителна информация
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={this.showContactList}>
                        Контактен лист
                    </Button>
                </div>
                <div className={`${classes.additionalInfo} ${!displayAdditionalInfo && classes.hideElement}`}>
                    <AdditionalClientInfo clientId={clientId} ></AdditionalClientInfo>
                </div>
                <div className={`${classes.additionalInfo} ${!displayContactList && classes.hideElement}`}>
                    <ContactList clientId={clientId} ></ContactList>
                </div>






            </>

        )
    }

}
export default withStyles(useStyles)(ClientInfo);
