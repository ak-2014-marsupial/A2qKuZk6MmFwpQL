import React from 'react';

import css from "./MoviesList.module.css"
import {useAppSelector} from "../../../hooks";
import {MoviesListCard} from "../MoviesListCard";
import {Pagination} from "../../Pagination";
import {Loader} from "../../Loader";
import {ErrorPage} from "../../../pages/MoviesPage/ErrorPage/ErrorPage";

const MoviesList = () => {
    const {total_pages, total_results, results, loading, errors} = useAppSelector(state => state.movies);
    if (errors) return <ErrorPage/>;
    if (loading) return <Loader/>;
    return (
        <div className={css.movies_list}>
            <div className={css.movies}>
                {results.map(i => <MoviesListCard key={i.id} movie={i}/>)}
            </div>
            {total_pages && total_results &&
                <Pagination total_pages={total_pages} total_results={total_results} moviesPerPage={+results.length}/>}
        </div>
    );
};

export {MoviesList};