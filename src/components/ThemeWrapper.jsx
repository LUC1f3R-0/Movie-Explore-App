import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/themeSlice';

const ThemeWrapper = ({ children }) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme !== null) {
            dispatch(setTheme(JSON.parse(storedTheme)));
            console.log('Stored theme value:', storedTheme);
        } else {
            console.log('No theme preference stored yet.');
        }
    }, [dispatch]);
    
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const themeStyles = {
        background: darkMode ? '#242424' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '1rem'
    };

    return <div style={themeStyles}>{children}</div>;
};

export default ThemeWrapper;
