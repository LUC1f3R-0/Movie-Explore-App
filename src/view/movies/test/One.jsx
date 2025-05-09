import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';
import { Typography, Box, Container } from '@mui/material';

const One = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await axiosInstance.get('/trending/movie/week');
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        fetchTrending();
    }, []);

    return (
        <div>
            <Container>
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
                    <Typography variant="h4" component="h2">
                        Top Trending Movies
                    </Typography>
                </Box>

                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Container>
        </div>
    );
};

export default One;