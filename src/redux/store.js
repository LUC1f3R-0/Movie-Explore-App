import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import movieReducer from './movieSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        movie: movieReducer,
    },
});
