import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

class Popup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, children, openPopup, setOpenPopup ,width } = this.props;
        return (
            <Dialog open={openPopup} maxWidth={width} fullWidth={true}  >
                <DialogTitle> 
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
}


export default Popup