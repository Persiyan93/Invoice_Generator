import { useState } from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../../../../Elements/Popup'
import ClientAddressForm from './ClientAddressForm'


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '40px',
        marginLeft: '30px',
        width: 650,
        height: 140,
        display: 'inline-block',
        margin: '0 20px',
        pading: '0 45px',
        borderRadius: 10,
        background: '#E8E9EC'




    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.9)',
    },
    title: {
        display: 'block',
        fontSize: 18,
        textAlign: 'center'
    },
    secondaryFont: {
        display: 'inline-block',
        marginTop: 7,
        fontSize: 20,
        marginRight: '20px',
        fontFamily: ' Garamond, serif'

    },
    mainFont: {
        fontWeight: '520',
        fontSize: 21,
        marginRight: '5px'
    }
}));



export default function AddressCard(props) {
    const { clientId, disableButton, addressInfo: { country, town, addressText } } = props
    const [isOpenPopup, setOpenPopup] = useState(false);



    const { } = props
    const classes = useStyles();
    return (
        <>
            {!country ?
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
                            {props.children}
                        </Typography>
                        <Typography className={classes.pos} >
                            {!disableButton &&
                                < Button startIcon={<AddCircleOutlineIcon />} size="large" onClick={setOpenPopup}>
                                    Добави Адрес
                                     </Button>
                            }


                        </Typography>
                    </CardContent>

                </Card>
                :
                <Card className={classes.root} variant="outlined">
                    <CardContent>

                        <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
                            {props.children}
                        </Typography>
                        <div style={{ display: 'inline-block' }}>
                            <span className={classes.mainFont} > Държава:</span>
                            <span className={classes.secondaryFont} > {country} </span>

                            <span className={classes.mainFont}  >Населено място:</span>
                            <span className={classes.secondaryFont} >{town}</span>
                        </div>

                        <div style={{ display: 'inline-block' }}>
                            <span className={classes.mainFont} >   Адрес:</span>
                            <span className={classes.secondaryFont} > {addressText} </span>
                        </div>

                          
                        <div style={{float:'right'}}>
                            {
                                !disableButton &&
                                <Button size="small" onClick={setOpenPopup}>Редактирай</Button>
                            }
                        </div>


                    </CardContent>
                  


                </Card>

            }
            <Popup
                openPopup={isOpenPopup}
                setOpenPopup={setOpenPopup}
                title='Добавяне на адрес'
            >

                <ClientAddressForm
                    updateAddress={props.changeAddress}
                    setOpenPopup={setOpenPopup}
                    fieldValues={{ country, town, addressText }}
                    clientId={clientId}
                />

            </Popup>
        </>
    )

}
















