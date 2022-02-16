import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Slide, useScrollTrigger, Box, IconButton, Menu, MenuItem } from '@mui/material';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';

// for hiding the header on scroll:
function HideOnScroll(props) {
    const { children} = props;
    const trigger = useScrollTrigger({
        target: undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired
};

const Header = (props) => {

    // links on AppBar:
    const navLinks = [
        {
            text: 'Add user',
            url: '/user/new'
        },
        {
            text: 'All users',
            url: '/'
        }
    ];

    // for responsive menu button:
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>

                        <SupervisedUserCircleRoundedIcon color="secondary" sx={{ mr: 0.5, display: { xs: 'none', md: 'flex' } }} />
                        <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            The Users Library
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {navLinks.map((navLink) => (
                                    <MenuItem key={navLink.text} onClick={handleCloseNavMenu} >
                                        <Link to={navLink.url} style={{ textDecoration: 'none' }}>{navLink.text}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <SupervisedUserCircleRoundedIcon color="secondary" sx={{ mr: 0.5, display: { xs: 'flex', md: 'none' } }} />
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            The Users Library
                        </Typography>
                        <Box sx={{ flexGrow: 20 }}/>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {navLinks.map((navLink) => (
                                <Link to={navLink.url} key={navLink.text} style={{ textDecoration: 'none' }}>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={handleCloseNavMenu}
                                    sx={{ m: 2, display: 'block' }}
                                >
                                    {navLink.text}
                                </Button>
                                </Link>
                            ))}
                        </Box>

                    </Toolbar>
                    
                </AppBar>

            </HideOnScroll>
            <Toolbar />
        </>
    )
}

export default Header;