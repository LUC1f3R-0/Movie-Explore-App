import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';

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
            <h2>Top Rated Movies</h2>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Two;
