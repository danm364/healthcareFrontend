import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    let auth0 = useAuth0();
    const navigation = useNavigate();

    let loading = navigation.state === "loading"

    let isAuthenticated = auth0?.isAuthenticated;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (auth0.isLoading || loading)
    {
        return <div>Loading...</div>
    }

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
                        <MenuItem onClick={handleClose} underline="none">
                            <Link to="/home">Home</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} underline="none">
                            <Link to="/about">About</Link>
                        </MenuItem>
                        {isAuthenticated && (
                        <Box>
                            <MenuItem onClick={handleClose} underline="none">
                                <Link to="/profile">Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose} underline="none">
                                <Link to="/documents">Documents</Link>
                            </MenuItem>
                        </Box>

                        )}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Website
                    </Typography>

                    {!isAuthenticated && (
                        <Button color="inherit" onClick={async () => {
                            await auth0?.loginWithRedirect({
                                authorizationParams: {
                                    redirect_uri: 'http://localhost:3000/'
                                }
                            })
                        }}>Log in</Button>
                    )}
                    {isAuthenticated && (
                        <Button color="inherit" onClick={async () => await auth0?.logout({ logutParams: { returnTo: 'http://127.0.0.1:3000/' }})}>logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Outlet />
        </div>
    );
}
