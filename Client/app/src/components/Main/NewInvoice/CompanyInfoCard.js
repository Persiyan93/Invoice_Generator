import React from 'react'
import {  makeStyles, Card,CardActions,CardContent,Button,Typography,AddCircleOutlineIcon  } from '@material-ui/core';
// import Popup from '../../Popup'
// import AddressForm from './AddressForm/AddressForm'
// import { FormatListNumberedRtlRounded } from '@material-ui/icons';
const useStyles=makeStyles({
    
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
        fontSize:13
    
      },
})
export default function CompanyInfoCard() {
    const classes=useStyles();
    return (
        <Card className={classes.root} variant="outlined">
        <CardContent>

          <Typography className={classes.title} component="h1" variant="h6" gutterBottom={false} align="center">
            Продавач
          </Typography>
          <Typography variant="subtitle2" component="h6" >
            Име на фирмата:
          </Typography>
          <Typography className={classes.pos}  color="textSecondary">
            Владис-2014 ЕООД
          </Typography>
          <Typography variant="subtitle2"  component="h6">
            Адрес:
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          гр.Мездра ,ул.Оборище 37-Б-18 д
          </Typography>
          <Typography variant="subtitle2"  component="h6">
           ДДС &#8470;
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            BG202898453
          </Typography>
          <Typography variant="subtitle2"  component="h6">
            ЕИК:
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          202898453
          </Typography>
        

        </CardContent>
        <CardActions>
          <Button size="small" >Редактирай</Button>
        </CardActions>

      </Card>
    )
}
