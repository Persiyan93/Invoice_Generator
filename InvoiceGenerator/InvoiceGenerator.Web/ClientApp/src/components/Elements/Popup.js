import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = (thema => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: thema.spacing(1)

        },
     },
    button: {
        float: 'right'
    }

}))
class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        this.props.setOpenPopup(false);
    }


    render() {
        const { title, children, openPopup, width, classes, icon } = this.props;
        return (
            <Dialog open={openPopup} maxWidth={width} fullWidth={true}   >
                <DialogTitle disableTypography={true} style={{ backgroundColor: '#379683' }}>

                    <Typography variant="h6">
                        <   IconButton color="default" size='large' >
                            {icon}
                        </IconButton>
                        {title}

                        <IconButton color="default" className={classes.button} onClick={this.clickHandler}>
                            <CloseIcon color="default" />
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