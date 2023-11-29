import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";


import { MovieInfoPage} from "./pages";
import {MainLayout} from "./layouts";
import {MoviesPage} from "./pages/MoviesPage/MoviesPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={"movies"}/>},
            {path: 'movies', element: <MoviesPage/>},
            {path: 'movies/:movieId', element: <MovieInfoPage/>},

        ]
    }
])

export {
    router
}