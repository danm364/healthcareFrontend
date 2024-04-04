import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";


export default function App() {
    let auth0 = useLoaderData()[0];
    console.log(auth0)
    let isAuthenticated = useLoaderData()[1]
    console.log(isAuthenticated)
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

                    {/*{!isAuthenticated && (*/}
                        <Button color="inherit" onClick={async () => await auth0.loginWithRedirect({ authorizationParams: { redirect_uri: 'http://localhost:3000/' } })}>Log in</Button>
                    {/*)}*/}
                    {/*{isAuthenticated && (*/}
                        <Button color="inherit" onClick={async () => await auth0.logout({ logutParams: { returnTo: 'http://127.0.0.1:3000/' }})}>logout</Button>
                    {/*)}*/}
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>
    );
}
