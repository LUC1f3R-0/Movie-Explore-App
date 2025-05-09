import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { Box, CircularProgress, Typography } from '@mui/material';
import MovieDetailCard from '../../components/MovieDetailCard';

const MovieDetailsPage = () => {
    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { id } = useParams();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance(`/movie/${id}`);
                setMovie(data);
            } catch (err) {
                setError('Failed to load movie details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return <MovieDetailCard key={movie.id} movie={movie} />;
};

export default MovieDetailsPage;
