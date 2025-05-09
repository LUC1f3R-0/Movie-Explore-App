import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Favorites = () => {

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const favorite = JSON.parse(localStorage.getItem('favorite')) || [];

  const fetchData = async () => {
    try {
      const requests = await Promise.all(favorite.map(id => axiosInstance.get(`https://api.themoviedb.org/3/movie/${id}`)));
      const data = requests.map(res => res.data);
      setMovies(data);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };


  const handleDelete = (movieId) => {
    const updatedFavorites = favorite.filter(id => id !== movieId);
    localStorage.setItem('favorite', JSON.stringify(updatedFavorites));

    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  useEffect(() => {
    if (favorite.length === 0) {
      Swal.fire({
        title: "Empty Favorites",
        icon: "warning",
        draggable: true
      });
      navigate(-1);
    } else {
      fetchData();
    }
  }, [favorite, navigate]);

  return (
    <div>
      <h1>Favorites</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>

              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies found</p>
      )}
    </div>
  );
};

export default Favorites;
