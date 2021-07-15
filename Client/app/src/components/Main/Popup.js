import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

class Popup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, children, openPopup, setOpenPopup } = this.props;
        return (
            <Dialog open={openPopup} >
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