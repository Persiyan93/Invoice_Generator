import { useState } from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../../Popup'
import AddressForm from './AddressForm/AddressForm'
import { FormatListNumberedRtlRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    maxWidth: 400,
    minHeight: 300,
    maxHeight: 320,
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
    fontSize: 18,
  },
  pos: {
    marginTop: 7,

  },
}));



export default function AddressCard(props) {
  const { clientId, disableButton } = props
  const [isOpenPopup, setOpenPopup] = useState(false);



  const { addressInfo: { country, town, addressText } } = props
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
            <Typography variant="h5" component="h2">
              Държава:
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {country}
            </Typography>
            <Typography variant="h5" component="h2">
              Град:
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {town}
            </Typography>
            <Typography variant="h5" component="h2">
              Адрес:
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {addressText}
            </Typography>

          </CardContent>
          {
            !disableButton &&
            <CardActions>
              <Button size="small" onClick={setOpenPopup}>Редактирай</Button>
            </CardActions>
          }


        </Card>

      }
      <Popup
        openPopup={isOpenPopup}
        setOpenPopup={setOpenPopup}
        title='Добавяне на адрес'
      >

        <AddressForm
          updateAddress={props.changeAddress}
          setOpenPopup={setOpenPopup}
          fieldValues={{ country, town, addressText }}
          clientId={clientId}
        />

      </Popup>
    </>
  )

}
















