import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddressCard from './AddressCard';
import * as clientService from '../../../../services/clientsService'
import ContactList from './ContactList';
import AddressForm from './AddressForm/AddressForm';
const useStyles = (theme => ({

    root:{
        marginTop:'5%'
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    hideElement: {
        display: 'none',
    },
    addressCard: {
        marginRight: '10px',
        display: 'inline-block'

    }

}))


class AdditionalClientInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId:this.props.clientId,
            openPopup: false,
            address: {
                addressText: '',
                town: '',
                country: ''
            },
            mailingAddress: {
                addressText: '',
                town: '',
                country: ''
            },
            accontablePersonName: '',
            contactList: [{ id: 10, name: 'Ivan Ivanov', emailAddress: 'test@abv.bg', phoneNumber: '32133123123123' }],
        }
        this.updateMailingAddress = this.updateMailingAddress.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
    }

    updateMailingAddress(newMailingAddress) {
        let result=clientService.addMailingAddress({...this.state})
                    .then(res=>res.json())
                    .then(res=>{
                        this.setState({ mailingAddress: newMailingAddress });
                    })
                    .catch(err=>console.log(err));
        
    }

    updateAddress(newAddress) {
        this.setState({ address: newAddress })
    }
    componentDidMount(){
        let res=clientService.getAdditionalInfo(this.state.clientId)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                this.setState({...res})
                console.log(res)
            })
            .catch(err=>console.log(err));

       
    }




    render() {
       
        const { classes } = this.props;
        
        

        return (
            <>
                <div className={classes.root} >


                    <AddressCard
                        {...this.state.address}
                        className={classes.addressCard}
                        setOpenPopup={this.setOpenPopup}
                        changeAddress={this.updateAddress}
                        clientId={this.state.clientId}
                    >
                        Адрес на фирмата
                    </AddressCard>
                    <AddressCard 
                     {...this.state.mailingAddress}
                     className={classes.addressCard} 
                     setOpenPopup={this.setOpenPopup}
                     changeAddress={this.updateMailingAddress}
                     clientId={this.state.clientId}
                     >
                          Адрес за кореспонденция
                    </AddressCard>
                   
                </div>

            </>
        );
    }
}



export default withStyles(useStyles)(AdditionalClientInfo);