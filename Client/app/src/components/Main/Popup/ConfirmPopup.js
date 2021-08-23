import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, makeStyles, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)

        },


    },
    button: {
        float: 'right'
        // marginRight: '2px',
        // marginLeft: '30%'

    }
}));


export default function ConfirmPopup(props) {

    function clickHandler() {
        props.setOpenPopup(false);
    }
    function confirmHandler() {
        props.actionAfterConfirmation();
        props.setOpenPopup(false)

    }



    const { title, question, openPopup, icon } = props
    const classes = useStyles()
    return (
        <Dialog open={openPopup} maxWidth='xs' fullWidth={true} >
            <DialogTitle disableTypography={true} style={{ backgroundColor: '#961E13 ', display: 'inlineBlock', alignItems: 'center', }}   >

                <Typography variant="h6">
                    {title}
                </Typography>

                <IconButton color="default" className={classes.button} onClick={clickHandler} size="small">
                    <CloseIcon size="small" />
                </IconButton>



            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6">
                    {question}
                </Typography>

                <Grid container alignContent='center' justifyContent >
                <Grid item md={2}/>
                    <Grid item md={4}>
                       
                            <CloseIcon htmlColor='red' onClick={confirmHandler} style={{width: '100%'}} />
                        
                    </Grid>
                    <Grid item md={4}>
                        
                            <CheckIcon htmlColor='green'  onClick={confirmHandler} style={{width: '100%'}} />
                     
                    </Grid>
                    <Grid item md={2}/>
                </Grid>



            </DialogContent>
        </Dialog>
    )

}


