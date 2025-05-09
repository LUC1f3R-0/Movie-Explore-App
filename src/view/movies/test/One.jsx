import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';

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
            <h2>Trending Movies</h2>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default One;
