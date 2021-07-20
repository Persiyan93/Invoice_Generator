import React from 'react'
import {  makeStyles,TextField,Checkbox } from '@material-ui/core';
import { Check } from '@material-ui/icons';
const useStyles=makeStyles({
    

divInvoiceInfo: {
    width: 300,
    height: 300,
    display: 'block',
    marginLeft: '90px',
  
    // pading: '0 15px',
    // //borderRadius: 10,
    // background: '#E6EAE9'




  },
    textField: {
    marginTop:20 ,
    paddingTop:10,
    fontSize:13

  },
})
export default function InvoiceInfo() {
    const classes = useStyles();
    return (
        <div className={classes.divInvoiceInfo}>
            <TextField
                label="Дата на издаване"
                type="date"
                defaultValue={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                className={classes.textField}
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}
                
               
            />
             <TextField
                label="Дата на данъчното събитие"
                type="date"
                defaultValue={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                className={classes.textField}
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}
            />
           
        </div>
    )
}
