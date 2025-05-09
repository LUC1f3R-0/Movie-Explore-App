import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';
import { Box, Typography } from '@mui/material';

const Three = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await axiosInstance.get('/movie/upcoming');
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
            }
        };

        fetchUpcoming();
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
                    Upcoming Movies
                </Typography>
            </Box>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Three;
