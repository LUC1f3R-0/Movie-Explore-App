import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieAnimation } from '../components/Animation';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <MovieAnimation />
        <h1 style={styles.title}>🎬 Welcome to MovieHub</h1>
        <p style={styles.subtitle}>Discover and save your favorite movies!</p>
        <button style={styles.button} onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};

export default Index;
