import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = (thema => ({
    
      

 
    button: {
        marginRight: '1%',
        marginLeft: '22%'
        
    }
   
}))
class BasePopup extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler=this.clickHandler.bind(this);
    }
    clickHandler(){
        this.props.setOpenPopup(false);
    }


    render() {
        const { title, children, openPopup,  width, classes,icon } = this.props
        return (
            <Dialog  open={openPopup} maxWidth={width} fullWidth={true} >
                <DialogTitle style={{backgroundColor:'#379683',display:'inlineBlock' ,alignItems:'center'}}  >
               
                    <Typography variant="h8">
                     {/* <   IconButton  color="default" size='small' >
                            {icon}
                        </IconButton> */}
                        {title}
                       
                        <IconButton  color="default" className={classes.button} onClick={this.clickHandler} size="small">
                            <CloseIcon color="default" size="small" />
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


export default withStyles(useStyles)(BasePopup)