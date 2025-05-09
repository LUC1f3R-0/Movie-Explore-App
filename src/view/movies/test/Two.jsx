import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';
import { Box, Typography } from '@mui/material';

const Two = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const response = await axiosInstance.get('/movie/top_rated');
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching top rated movies:', error);
            }
        };

        fetchTopRated();
    }, []);

    return (
        <div>
            <Box
                mt={10}
                mb={4}
                sx={{
                    mx: 'auto',
                    px: 3,
                    py: 1,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    borderRadius: '20px',
                    boxShadow: 2,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" component="h2" align="center">
                    Top Trending Movies
                </Typography>
            </Box>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Two;
