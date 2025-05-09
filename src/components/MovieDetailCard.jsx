import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Stack, Button, } from '@mui/material';

const MovieDetailCard = ({ movie }) => {
    return (
        <Box
            sx={{ px: 2, pt: { xs: 8, sm: 10, md: 12 } }}
        >
            <Card
                sx={{ width: { xs: '100%', sm: '90%', md: '75%', lg: '60%', xl: '50%', }, margin: 'auto', borderRadius: 3, boxShadow: 5, }}
            >
                <CardMedia
                    component="img"
                    height="100%"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {movie.title}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Release Date: {movie.release_date} | Runtime: {movie.runtime} min
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1} mb={2} flexWrap="wrap">
                        {movie.genres?.map((genre) => (
                            <Chip key={genre.id} label={genre.name} color="primary" />
                        ))}
                    </Stack>

                    <Typography variant="body1" paragraph>
                        {movie.overview}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Languages: {movie.spoken_languages?.map((lang) => lang.english_name).join(', ')}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Countries: {movie.production_countries?.map((c) => c.name).join(', ')}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Companies: {movie.production_companies?.map((c) => c.name).join(', ')}
                    </Typography>

                    <Box mt={2}>
                        <Typography variant="body2" fontWeight="bold">
                            IMDb: {movie.imdb_id} | Vote: {movie.vote_average} ⭐ ({movie.vote_count} votes)
                        </Typography>
                    </Box>

                    {movie.homepage && (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            href={movie.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Homepage
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MovieDetailCard;
