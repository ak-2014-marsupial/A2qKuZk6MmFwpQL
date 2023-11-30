import React from 'react';

import {MoviesList} from "../../../components";
import {SideBar} from "../../../components/SideBar";
import css from "./MoviesPage.module.css"

const MoviesPage = () => {

    return (
        <div className={css.movies}>
            <SideBar/>
            <MoviesList/>
        </div>
    );
};

export {MoviesPage};