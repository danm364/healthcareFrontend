import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import Footer from "./components/landingpage/components/Footer"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AuthLayout } from './AuthLayout'
import { Auth0Provider } from '@auth0/auth0-react';
import { linkContext } from './utilities/LinkContext';



export default function NavBar() {

    //auth0
    let auth0 = useAuth0();
    let isAuthenticated = auth0?.isAuthenticated;
    let isLoading = auth0?.isLoading;

    const navigation = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('tablet'));

    let loading = navigation.state === "loading"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClose = () => {
        setAnchorEl(null);
    };

    if ( isLoading || loading)
    {
        return <div>Loading...</div>
    }

    if (matches) {
        return (
                <div sx={{ height: "800px" }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={(event) => { setAnchorEl(event.currentTarget); }}
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
                                            <Link to="/claims">Claims</Link>
                                        </MenuItem>
                                    </Box>

                                )}
                            </Menu>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Healthease
                            </Typography>

                            {!isAuthenticated && (
                                <Button color="inherit" onClick={async () => {
                                    await auth0?.loginWithRedirect({
                                        authorizationParams: {
                                            redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`
                                        }
                                    })
                                }}>Log in</Button>
                            )}
                            {isAuthenticated && (
                                <Button color="inherit" onClick={async () => await auth0?.logout({ logutParams: { returnTo: `${process.env.REACT_APP_RETURN_TO}` } })}>logout</Button>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Outlet auth0={ auth0 } />
                    </div>

        );
    }
    else {
        return (
            <Box sx={{
            }}
            >
                <Box sx={{
                    display: "flex",
                    color: `${theme.palette.common.white}`,
                    backgroundColor: `${theme.palette.primary.main}`,
                    justifyContent: "space-around",
                    alignItems:"center",
                    height:"56px"
                }}
                >
                    <Box sx={ { width:"80%", display:"flex" } }>
                        <Button color="inherit" onClick={ () => navigation("home")}>Healthease</Button>
                        <Button color="inherit" onClick={() => navigation("home")}>Home</Button>
                        <Button color="inherit" onClick={ () => navigation("about") }>About</Button>
                        {isAuthenticated && (
                        <Box >
                            <Button color="inherit" onClick={() => navigation("profile")}>Profile</Button>
                            <Button color="inherit" onClick={() => navigation("claims")} >Claims</Button>
                        </Box>
                        )
                        }
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        JustifyContent:"end"
                    }}
                    >
                    {!isAuthenticated && (
                        <Button color="inherit" onClick={async () => {
                            await auth0?.loginWithRedirect({
                                authorizationParams: {
                                    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`
                                }
                            })
                        }}>Log in</Button>
                    )}
                    {isAuthenticated && (
                        <Button color="inherit" onClick={async () => await auth0?.logout({ logutParams: { returnTo: `${process.env.REACT_APP_RETURN_TO}` } })}>logout</Button>
                    )}
                    </Box>
                </Box>
            <Outlet />
                </Box>
        )
    }
}
