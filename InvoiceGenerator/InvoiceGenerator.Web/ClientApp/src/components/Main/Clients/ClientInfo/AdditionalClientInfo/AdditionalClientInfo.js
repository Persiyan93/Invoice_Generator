import { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core/';
import useFetchGet from '../../../../../hooks/useFetchGet'
import apiEndpoints from '../../../../../services/apiEndpoints';
import AddressInfoCard from './AddressInfoCard';
import * as clientsService from '../../../../../services/clientsService'



const useStyles = makeStyles(theme => ({
    addressCard: {
        marginRight: '10px',
        display: 'inline-block'

    }

}))


export default function AdditionalClientInfo(props) {
    const clientId = props.clientId
    const [additionalClientInfo, setAdditionaClientInfo] = useState({});
    const [openPopup, setOpenPopup] = useState(false);


    //Get Additianal client Info which contains mailing address and address of registration
    const [getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger] = useState(true);
    let getAdditionalClientInfoURl = apiEndpoints.getAdditionalClientInfo + `/${clientId}`
    useFetchGet(getAdditionalClientInfoURl, setAdditionaClientInfo, getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger);




    function updateMailingAddress(newAddress) {
        console.log(newAddress)
        clientsService.addMailingAddress({ ...newAddress, clientId })
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

            })

    }




    const classes = useStyles();
    return (
        <>

            <Grid container justifyContent={true}>
                <Grid item md={6}>
                    <AddressInfoCard
                        addressInfo={{ ...additionalClientInfo.address }}
                        className={classes.addressCard}
                        setOpenPopup={setOpenPopup}
                        clientId={clientId}
                        disableButton={true}
                    >
                        Адрес на фирмата
                    </AddressInfoCard>
                </Grid>
                <Grid item md={6}>
                    <AddressInfoCard
                        addressInfo={{ ...additionalClientInfo.mailingAddress }}
                        className={classes.addressCard}
                        setOpenPopup={setOpenPopup}
                        changeAddress={updateMailingAddress}
                        clientId={clientId}
                    >
                        Адрес за кореспонденция
                    </AddressInfoCard>
                </Grid>
            </Grid>








        </>
    );
}




