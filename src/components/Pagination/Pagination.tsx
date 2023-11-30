import React, {FC, useEffect, useState} from 'react';

import {useSearchParams} from "react-router-dom";
import css from "./Pagination.module.css";
import {useAppSelector} from "../../hooks";


const Pagination: FC = () => {
    const {page,total_pages,total_results,results} = useAppSelector(state => state.movies);
    const moviesPerPage=results.length;

    const [, setQuery] = useSearchParams({page: `1`});

    const [countMovieNext, setCountMovieNext] = useState(0);
    const [countMoviePrev, setCountMoviePrev] = useState(0);

    useEffect(() => {
        setCountMovieNext((total_results - page * moviesPerPage) > 0 ? (total_results - page * moviesPerPage) : 0);
        setCountMoviePrev((page - 1) * moviesPerPage);
    }, [page, total_results, moviesPerPage]);

    const handlePrev = () => {
        if (page <= 1) {
            return
        } else {
            setQuery(prev => {
                prev.set('page', `${page - 1}`);
                return prev
            })
        }
    }

    const handleNext = () => {
        console.log(page," total",total_pages);
        if (page >= total_pages) {

            return
        } else {
            setQuery(prev => {
                prev.set('page', `${page + 1}`);
                return prev
            })
        }
    }

    return (
        <div className={css.pagination}>
            <div> {new Intl.NumberFormat().format(countMoviePrev)} ....</div>
            <button disabled={page <= 1} onClick={handlePrev}>Prev</button>
            <button disabled={page >= total_pages} onClick={handleNext}>Next</button>
            <div> ... {new Intl.NumberFormat().format(countMovieNext)} </div>
        </div>
    );
};

export {Pagination};