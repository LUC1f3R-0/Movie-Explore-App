import React, { useState } from 'react'; // Removed useEffect since it's not used
import axiosInstance from '../../api/axiosInstance';
import { Card, CardContent, CardMedia, Button, Box, Typography, Chip, Stack, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004];
    const genres = ['Action', 'Comedy', 'Drama', 'Thriller'];
    const ratings = ['1-2', '3-4', '5-6', '7-8'];

    const handleFilter = async () => {
        if (!selectedYear && !selectedGenre && !selectedRating) {
            setError('Please select at least one filter.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const params = {
                year: selectedYear,
                genre: selectedGenre,
                rating: selectedRating,
            };

            const response = await axiosInstance.get('/discover/movie', { params });
            setResults(response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '80px' }}> {/* Add margin for space below navbar */}
            <h2>Search Results</h2>

            {/* Dropdown for Year */}
            <label htmlFor="year">Year:</label>
            <select id="year" onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            {/* Dropdown for Genre */}
            <label htmlFor="genre">Genre:</label>
            <select id="genre" onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>

            {/* Dropdown for Rating */}
            <label htmlFor="rating">Rating:</label>
            <select id="rating" onChange={(e) => setSelectedRating(e.target.value)}>
                <option value="">Select Rating</option>
                {ratings.map((rating) => (
                    <option key={rating} value={rating}>{rating}</option>
                ))}
            </select>

            {/* Filter Button */}
            <button onClick={handleFilter} disabled={loading}>
                {loading ? 'Loading...' : 'Filter'}
            </button>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Filtered Results */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {results.length > 0 ? (
                    results.map((movie) => (
                        <Card
                            key={movie.id}
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                mb: 3,
                                mt: 3,
                                maxWidth: 800,
                                border: `2px solid #ccc`,
                                mx: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
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
                                    boxShadow: 1,
                                }}
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent sx={{ flex: 1, padding: 2 }}>
                                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {movie.title} ({movie.release_date.split('-')[0]})
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={movie.vote_average / 2} precision={0.5} readOnly sx={{ mr: 1 }} />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes) | Popularity: {movie.popularity}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {movie.overview?.slice(0, 150)}
                                    {movie.overview?.length > 150 && '...'}
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {movie.genres?.map((genre) => (
                                        <Chip key={genre} label={genre} size="small" sx={{ marginTop: 1 }} />
                                    ))}
                                </Box>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="primary" onClick={() => navigate(`/movies/details/${movie.id}`)}>
                                        View Details
                                    </Button>
                                    <Button variant="outlined" color="secondary">
                                        Add to Favorites
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h5" color="textSecondary">
                            No results found matching your criteria.
                        </Typography>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default Search;