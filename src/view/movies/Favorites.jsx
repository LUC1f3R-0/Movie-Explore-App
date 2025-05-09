import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, Container, Button, Stack, } from '@mui/material';

const Favorites = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem('favorite')) || []);

  useEffect(() => {

    if (JSON.parse(localStorage.getItem('login'))) { navigate('/') }

    const fetchData = async () => {
      try {
        const requests = await Promise.all(
          favorite.map((id) =>
            axiosInstance.get(`https://api.themoviedb.org/3/movie/${id}`)
          )
        );
        const data = requests.map((res) => res.data);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    if (favorite.length === 0) {
      Swal.fire({
        title: 'Empty Favorites',
        icon: 'warning',
        confirmButtonText: 'Go Back',
      }).then(() => navigate(-1));
    } else {
      fetchData();
    }
  }, [favorite, navigate]);

  const handleDelete = (movieId) => {
    const updatedFavorites = favorite.filter((id) => id !== movieId);
    localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
    setFavorite(updatedFavorites);
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <Container sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      {movies.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={3}>
          {movies.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                border: '2px solid #ddd',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
                sx={{
                  width: { xs: '100%', sm: 200 },
                  objectFit: 'cover',
                  borderRadius: { md: '8px 0 0 8px', xs: '8px 8px 0 0' },
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {movie.title} ({movie.release_date?.split('-')[0]})
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    sx={{ color: '#ff9800', mr: 1 }}
                  />
                  <Typography variant="body2">
                    {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {movie.overview?.slice(0, 150)}{movie.overview?.length > 150 && '...'}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {movie.genres?.map((genre) => (
                    <Chip key={genre.id} label={genre.name} color="primary" size="small" />
                  ))}
                </Box>
                <Stack direction="row">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No favorite movies found.</Typography>
      )}
    </Container>
  );
};

export default Favorites;
