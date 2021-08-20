import { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core/';
import useFetchPost from '../../../../hooks/useFetchPost';
import useFetchGet from '../../../../hooks/useFetchGet';
import apiEndpoints from '../../../../services/apiEndpoints';
import AddressCard from './AddressCard';
import * as clientService from '../../../../services/clientsService'
import ClienInvoices from './ClientInvoices'
import ContactList from './ContactList';
import AddressForm from './AddressForm/AddressForm';
import useFetch from '../../../../hooks/useFetch';
import { AccordionActions } from '@material-ui/core';
const useStyles = makeStyles(theme => ({

    root: {
        marginTop: '5%',
        backgroundColor: '#B8B1C5',
        padding: theme.spacing(5),
        borderRadius: 10

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


export default function AdditionalClientInfo(props) {
    const clientId = props.clientId
    const [additionalClientInfo, setAdditionaClientInfo] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [contactList, setContactList] = useState([]);
    //accontablePersonName

    // const [postMailingAddressTriger, setPostMailingAddressTriger] = useState(false);
    // useFetchPost(apiEndpoints.addMailingAddress, { newAddress, clientId }, postMailingAddressTriger, setPostMailingAddressTriger,
    //     actionAfterSuccessfullupdatedMailingAddress)

    const [getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger] = useState(true);
    let getAdditionalClientInfoURl = apiEndpoints.getAdditionalClientInfo + `/${clientId}`
    useFetchGet(getAdditionalClientInfoURl, setAdditionaClientInfo, getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger);
    console.log(getAdditionalClientInfoTriger)
    function actionAfterSuccessfullupdatedMailingAddress() {

    }

    function updateAddress() {

    }
    function updateMailingAddress(newAddress) {
        console.log(newAddress)
        clientService.addMailingAddress({ ...newAddress, clientId })
            .then(res => {
                if (res.status == "Unsuccessful") {
                    console.log('Unsuccessful status ')
                    console.log(res);
                }
                else {
                    setAdditionaClientInfo(prevState => ({ ...prevState, mailingAddress: { ...newAddress } }))
                }

            })
            .catch(err => {
                console.log(err);
                //this.props.history.push('/Errors/ConnectionError')
            })

    }



    console.log(additionalClientInfo)
    const classes = useStyles();
    return (
        <>

            <Grid container justifyContent={true}>
                <Grid item md={6}>
                    <AddressCard
                        addressInfo={{ ...additionalClientInfo.address }}
                        className={classes.addressCard}
                        setOpenPopup={setOpenPopup}
                        // changeAddress={updateAddress}
                        clientId={clientId}
                        disableButton={true}
                    >
                        Адрес на фирмата
                    </AddressCard>
                </Grid>
                <Grid item md={6}>
                    <AddressCard
                        addressInfo={{ ...additionalClientInfo.mailingAddress }}
                        className={classes.addressCard}
                        setOpenPopup={setOpenPopup}
                        changeAddress={updateMailingAddress}
                        clientId={clientId}
                    >
                        Адрес за кореспонденция
                    </AddressCard>
                </Grid>
            </Grid>








        </>
    );
}




