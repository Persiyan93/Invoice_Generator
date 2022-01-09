
import { useState } from 'react';
import { makeStyles,} from '@material-ui/core';
import useFetchGet from '../../../../../hooks/useFetchGet'
import * as clientsService from '../../../../../services/clientsService'
import apiEndpoints from '../../../../../services/apiEndpoints'
import AddressCard from './AddressCard'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'block'
    }
}));



export default function CompanyAddresses(props) {
    const clientId = props.clientId
    const [additionalClientInfo, setAdditionaClientInfo] = useState({});
    const [isOpenPopup, setOpenPopup] = useState(false);

    const [getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger] = useState(true);
    let getAdditionalClientInfoURl = apiEndpoints.getAdditionalClientInfo + `/${clientId}`
    useFetchGet(getAdditionalClientInfoURl, setAdditionaClientInfo, getAdditionalClientInfoTriger, setGetAdditionaClientInfoTriger);

    function updateMailingAddress(newAddress) {
        console.log(newAddress)
        clientsService.addMailingAddress({ ...newAddress, clientId })
            .then(res => {
                if (res.status == "Unsuccessful") {

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

    const { } = props
    const classes = useStyles();
    return (
        <div className={ classes.main}>

            <AddressCard
                addressInfo={{ ...additionalClientInfo.address }}
                className={classes.addressCard}
                setOpenPopup={setOpenPopup}
                clientId={clientId}
                disableButton={true}
            > Адрес на регистрация </AddressCard>

            <AddressCard
                addressInfo={{ ...additionalClientInfo.mailingAddress }}
                className={classes.addressCard}
                setOpenPopup={setOpenPopup}
                clientId={clientId}
                changeAddress={updateMailingAddress}
            > Адрес за кореспонденция </AddressCard>




        </div>
    )

}
















