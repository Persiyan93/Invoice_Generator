import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FiberNewIcon from '@material-ui/icons/FiberNew';

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

export default function UsersMenu() {
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
                Настройки
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/Users/CreateUser" style={{ textDecoration: 'none' }}>
                    <StyledMenuItem>

                        <ListItemIcon>
                            <FiberNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Добавяне на потребител" />
                    </StyledMenuItem>
                </Link>

                <Link to="/Users/All" >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Всички потребители " />
                    </StyledMenuItem>
                </Link>
                <Link to="/History" style={{ textDecoration: 'none' }}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <InboxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="История" />
                    </StyledMenuItem>
                </Link>
                <Link to="/Settings" style={{ textDecoration: 'none' }}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <InboxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Настройки на фирмата" />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </div>
    );
}