import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import MovieCard from '../../../components/Card';

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
            <h2>Upcoming Movies</h2>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Three;
