import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { toggleTheme } from '../../redux/themeSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MuiModal from '../MuiModal';

export default function SimpleNavBar() {
    const [isDark, setIsDark] = React.useState(
        JSON.parse(localStorage.getItem('darkMode')) || false
    );

    const [openSearchModal] = React.useState(false);
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        dispatch(toggleTheme());
    };
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: isDark ? '#222' : 'white',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: isDark ? 'black' : 'white' }}>
                <Toolbar>
                    <NavLink
                        to='/movies'
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 'bold', color: isDark ? 'white' : 'blue' }}
                    >
                        <LiveTvIcon />
                    </NavLink>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 1, md: 5, xl: 10 },
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <NavLink
                            to="one"
                            sx={{ fontWeight: 'bold', color: isDark ? 'white' : 'blue', position: 'relative' }}
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                color: isActive ? 'orange' : isDark ? 'white' : 'blue',
                                textDecoration: isActive ? 'underline' : 'none',
                            })}
                        >
                            Trending
                        </NavLink>

                        <NavLink
                            to="two"
                            sx={{ fontWeight: 'bold', color: isDark ? 'white' : 'blue', position: 'relative' }}
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                color: isActive ? 'orange' : isDark ? 'white' : 'blue',
                                textDecoration: isActive ? 'underline' : 'none',
                            })}
                        >
                            Top
                        </NavLink>

                        <NavLink
                            to="three"
                            sx={{ fontWeight: 'bold', color: isDark ? 'white' : 'blue', position: 'relative' }}
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                color: isActive ? 'orange' : isDark ? 'white' : 'blue',
                                textDecoration: isActive ? 'underline' : 'none',
                            })}
                        >
                            Upcoming
                        </NavLink>
                    </Box>

                    <NavLink
                        to="search"
                        style={({ isActive }) => ({ color: isActive ? 'orange' : isDark ? 'white' : 'blue', textDecoration: 'none' })}
                    >
                        <SearchIcon />
                    </NavLink>

                    <NavLink
                        to="favorite"
                        style={({ isActive }) => ({ color: isActive ? 'orange' : isDark ? 'white' : 'blue', textDecoration: 'none' })}
                    >
                        <FavoriteIcon />
                    </NavLink>

                    <IconButton color="inherit" sx={{ color: isDark ? 'white' : 'blue' }} onClick={handleThemeToggle}>
                        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Modal
                open={openSearchModal}
                aria-labelledby="search-modal-title"
                aria-describedby="search-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="search-modal-title" variant="h6" component="h2" sx={{ mb: 2, color: isDark ? 'white' : 'black' }}>
                        Search
                    </Typography>
                    <MuiModal

                    />
                </Box>
            </Modal>
        </>
    );
}