import React from 'react';

import css from "./MoviesList.module.css"
import { useAppSelector} from "../../../hooks";
import {MoviesListCard} from "../MoviesListCard";
import {Pagination} from "../../Pagination";

const MoviesList = () => {
    const {total_pages,total_results,results} = useAppSelector(state=>state.movies);

    return (
        <div className={css.movies_list}>
            <div className={css.movies}>
                {results && results.map(i => <MoviesListCard key={i.id} movie={i}/>)}
            </div>
            {total_pages&&total_results &&
                <Pagination total_pages={total_pages} total_results={total_results} moviesPerPage={+results.length}/>}
        </div>
    );
};

export {MoviesList};