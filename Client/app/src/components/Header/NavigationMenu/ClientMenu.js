import React from 'react';
import { withStyles, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { Link } from 'react-router-dom';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                // color: theme.palette.common.white,
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function InvoiceMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color='default'
                onMouseOver={handleClick}
            >
                Клиенти
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/Clients/NewClient" style={{ textDecoration: 'none' }}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FiberNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Нов клиент" />
                    </StyledMenuItem>
                </Link>
                <Link to="/Clients/All" style={{ textDecoration: 'none' }} >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Всички" />
                    </StyledMenuItem>
                </Link>

            </StyledMenu>
        </div>
    );
}