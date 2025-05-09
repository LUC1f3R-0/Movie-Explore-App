import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import axiosInstance from '../../api/axiosInstance';
import MovieCard from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

const Movies = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movie.movies);

    const fetch = React.useCallback(async () => {
        setLoading(false);
        try {
            const { data, status } = await axiosInstance.get('/discover/movie');
            if (status === 200) {
                dispatch(setMovies(data.results));
                setLoading(true);
            }
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            setLoading(false);
        }
    }, [dispatch]);

    React.useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('login'));

        if (isLogged) {
            navigate('/');
        }
        fetch();
    }, [fetch, navigate]);

    return (
        <>
            {
                loading
                    ? movies.map(card => (
                        <MovieCard key={card.id} movie={card} />
                    ))
                    : (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh',
                            }}
                        >
                            <CircularProgress sx={{ color: 'black' }} />
                        </Box>
                    )
            }
        </>
    );
};

export default Movies;
