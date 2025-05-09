import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, Container, Button, Stack, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const borderColor = '#ddd';
    const cardHoverShadow = 6;
    const boxShadowImage = 2;
    const textColor = '#000';
    const ratingColor = '#ff9800';
    const chipColor = 'primary';

    const renderCard = (movie) => (
        <Card
            key={movie.id}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                mb: 3,
                mt: 3,
                maxWidth: 800,
                border: `2px solid ${borderColor}`,
                mx: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                '&:hover': {
                    boxShadow: cardHoverShadow,
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                },
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', sm: 200 },
                    objectFit: 'cover',
                    borderRadius: 1,
                    boxShadow: boxShadowImage,
                }}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <CardContent sx={{ flex: 1, padding: 2 }}>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', color: textColor }}>
                    {movie.title} ({movie.release_date.split('-')[0]})
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={movie.vote_average / 2} precision={0.5} readOnly sx={{ mr: 1, color: ratingColor }} />
                    <Typography variant="body2" sx={{ ml: 1, color: textColor }}>
                        {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes) | Popularity: {movie.popularity}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2, color: textColor }}>
                    {movie.overview?.slice(0, 150)}
                    {movie.overview?.length > 150 && '...'}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {movie.genres?.map((genre) => (
                        <Chip key={genre} label={genre} color={chipColor} size="small" sx={{ marginTop: 1 }} />
                    ))}
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/movie/search/${movie.id}`)}>
                        View Details
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate()}>
                        Add to Favorites
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
    return (
        <Container sx={{ paddingX: 2, paddingY: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                {renderCard(movie)}
            </Box>
        </Container>
    );
};

export default MovieCard;
