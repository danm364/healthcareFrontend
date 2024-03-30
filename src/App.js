import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

export default function App() {
    const { logout } = useAuth0();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to="/home">Home</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/profile">Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/about">About</Link>
                        </MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Website
                    </Typography>

                    {!isAuthenticated && (
                        <Button color="inherit" onClick={() => loginWithRedirect()}>Log in</Button>
                    )}
                    {isAuthenticated && (
                        <Button color="inherit" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>
    );
}
