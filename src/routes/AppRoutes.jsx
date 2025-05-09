import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../view/Index'
import Login from '../view/auth/Login'
import Home from '../view/movies/Home'
import NotFound from '../view/error/NotFound'
import MovieLayout from '../components/layout/MovieLayout'
import One from '../view/movies/test/One'
import Two from '../view/movies/test/Two'
import Three from '../view/movies/test/Three'
import Movies from '../view/movies/Movies'
import MovieDetailsPage from '../view/movies/MovieDetailsPage'
import Favorites from '../view/movies/Favorites'
import Search from '../view/movies/Search'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/movies' element={<MovieLayout />} >
                <Route index element={<Movies />} />
                <Route path='details/:id' element={<MovieDetailsPage />} />
                <Route path='one' element={<One />} />
                <Route path='two' element={<Two />} />
                <Route path='favorite' element={<Favorites />} />
                <Route path='three' element={<Three />} />
                <Route path='search' element={<Search />} />
            </Route>


            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
