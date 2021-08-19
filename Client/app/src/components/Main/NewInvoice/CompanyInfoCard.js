import { useEffect, useState, Fragment } from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useFetchGet from '../../../hooks/useFetchGet'
import Popup from '../Popup';
import ClientList from '../Clients/ClientList/ClientList';
import ClientListInInvoice from './ClientListInInvoice';
import CompanyDetails from '../../Identity/Register/CompanyDetails';
import PeopleIcon from '@material-ui/icons/People';
import { convertCompanyName } from '../../../services/globalServices'
// import Popup from '../../Popup'
// import AddressForm from './AddressForm/AddressForm'
// import { FormatListNumberedRtlRounded } from '@material-ui/icons';
const useStyles = makeStyles({

    title: {
        fontSize: 20,
    },
    root: {
        width: 300,
        height: 300,
        display: 'inline-block',
        margin: '10px 20px',
        // pading: '0 15px',
        borderRadius: 10,
        background: '#E6EAE9'
    },
    pos: {
        marginTop: 2,
        fontSize: 13

    },
})
export default function CompanyInfoCard(props) {
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({})
    const { companyInfo, disableButton, } = props;
    console.log(companyInfo)


    useEffect(() => {
        if (companyInfo) {
            const { address } = companyInfo
            setCompanyDetails((prevState) => ({ ...companyInfo, address: address.country + ',гр. ' + address.town + ' , ' + address.addressText }))

        }
       
    }, [companyInfo])
    const classes = useStyles();

    function clickHandler(event) {
        setOpenPopup(true);
    }

    return (
        <Fragment>
            {
                !companyInfo ? (
                    <Card className={classes.root} variant="outlined" >
                        <CardContent>
                            <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
                                {props.children}
                            </Typography>
                            <Typography className={classes.pos} >
                                {
                                    !disableButton &&
                                    <Button size="large" onClick={clickHandler} >
                                        <AddCircleOutlineIcon />
                                        Добави Получател
                                    </Button>
                                }

                            </Typography>
                        </CardContent>

                    </Card>
                ) :
                    (
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
                                    {props.children}
                                </Typography>
                                <Typography variant="subtitle2" component="h6" >
                                    Име на фирмата:
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {convertCompanyName({ ...companyDetails })}
                                </Typography>
                                <Typography variant="subtitle2" component="h6">
                                    Адрес:
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {companyDetails.address}
                                </Typography>
                                <Typography variant="subtitle2" component="h6">
                                    ДДС &#8470;
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {companyDetails.vatNumber}
                                </Typography>
                                {
                                    companyDetails.uniqueIdentificationNumber &&
                                    <Fragment>
                                        <Typography variant="subtitle2" component="h6">
                                            ЕИК:
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {companyDetails.uniqueIdentificationNumber}
                                        </Typography>
                                    </Fragment>

                                }
                                {
                                    companyDetails.accontablePersonName &&
                                    <Fragment>
                                        <Typography variant="subtitle2" component="h6">
                                            Материално отговорно лице
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {companyDetails.accontablePersonName}
                                        </Typography>
                                    </Fragment>

                                }
                            </CardContent>
                            <CardActions style={disableButton ? { display: 'none' } : { marginTop: '1px' }}  >
                                <Button size="small" variant='outlined' onClick={() => setOpenPopup(true)}>Редактирай</Button>
                            </CardActions>

                        </Card>
                    )

            }
            <Popup
                openPopup={isOpenPopup}
                setOpenPopup={setOpenPopup}
                title='Списък с клиенти'
                width='xl'
                icon={<PeopleIcon color="default" size="large" />}
            >
                <ClientListInInvoice
                    setInvoiceDetails={props.setInvoiceDetails}
                    setClientInfoGetTriger={props.setClientInfoGetTriger}
                    setOpenPopup={setOpenPopup}
                ></ClientListInInvoice>

            </Popup>
        </Fragment>


    )
}
