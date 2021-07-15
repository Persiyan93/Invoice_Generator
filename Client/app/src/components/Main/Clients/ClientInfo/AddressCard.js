import React from 'react';
import { withStyles, Card } from '@material-ui/core';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from '../../Popup'
import AddressForm from './AddressForm/AddressForm'
import { FormatListNumberedRtlRounded } from '@material-ui/icons';

const useStyles = (theme => ({
  root: {
    minWidth: 320,
    maxWidth: 440,
    minHeight: 300,
    maxHeight: 320,
    display: 'inline-block',
    margin: '0 20px',
    pading: '0 45px',
    borderRadius: 10,
    background: '#bcd8ac'




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



class AddressCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openPopup: false,
    }
    this.setOpenPopup = this.setOpenPopup.bind(this);
  }

  setOpenPopup() {
    console.log('open is trigered')
    this.setState((state) => ({ openPopup: !state.openPopup }))
  }


  render() {
    const { country, town, addressText } = this.props
    const { classes } = this.props;


    return (
      <React.Fragment>
        {!country ?
          <Card className={classes.root} variant="outlined">
            <CardContent>
            <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
                {this.props.children}
              </Typography>
              <Typography className={classes.pos} >
                <Button size="large" onClick={this.setOpenPopup}>
                  <AddCircleOutlineIcon/>
                  Добави Адрес
                </Button>
              </Typography>
            </CardContent>

          </Card>
          :
          <Card className={classes.root} variant="outlined">
            <CardContent>

              <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
                {this.props.children}
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
            <CardActions>
              <Button size="small" onClick={this.setOpenPopup}>Редактирай</Button>
            </CardActions>

          </Card>

        }
        <Popup
          openPopup={this.state.openPopup}
          setOpenPopup={this.setOpenPopup}
          title='Добавяне на адрес'
        >

          <AddressForm
            updateAddress={this.props.changeAddress}
            setOpenPopup={this.setOpenPopup}
            fieldValues={{country, town, addressText}}
            clientId={this.props.clientId}
          />

        </Popup>
      </React.Fragment>




    )
  }
}


export default withStyles(useStyles)(AddressCard);













