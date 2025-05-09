import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
const Home = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            Toggle Theme
        </button>
    );
};

export default Home;
