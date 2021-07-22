import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = (thema => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: thema.spacing(1)

        },
      

    },
    button: {
        marginLeft: '74%',
        
    }
   
}))
class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler=this.clickHandler.bind(this);
    }
    clickHandler(){
        this.props.setOpenPopup(false);
    }


    render() {
        const { title, children, openPopup, setOpenPopup, width, classes } = this.props;
        return (
            <Dialog open={openPopup} maxWidth={width} fullWidth={true}   >
                <DialogTitle>
               
                    <Typography variant="h6">
                    <   IconButton  color="primary" size='large' >
                            <PeopleIcon color="primary"  size="large"/>
                        </IconButton>
                        {title}
                       
                        <IconButton  color="secondary" className={classes.button} onClick={this.clickHandler}>
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </Typography>
                   

                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
}


export default withStyles(useStyles)(Popup)