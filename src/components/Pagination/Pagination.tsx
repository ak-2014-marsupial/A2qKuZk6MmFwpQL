import React, {FC, useEffect, useState} from 'react';

import {useSearchParams} from "react-router-dom";
import css from "./Pagination.module.css";

interface IProps {
    total_pages: number,
    total_results: number,
    moviesPerPage: number,
}

const Pagination: FC<IProps> = ({total_pages, total_results, moviesPerPage}) => {

    const [query, setQuery] = useSearchParams({page: `1`});
    const currentPage = +query.get('page');

    const [countMovieNext, setCountMovieNext] = useState(0);
    const [countMoviePrev, setCountMoviePrev] = useState(0);
    // console.log(total_results+"  " +currentPage+ "   "+  moviesPerPage);

    useEffect(() => {
        setCountMovieNext((total_results - currentPage * moviesPerPage) > 0 ? (total_results - currentPage * moviesPerPage) : 0);
        setCountMoviePrev((currentPage - 1) * moviesPerPage);
    }, [currentPage, total_results, moviesPerPage]);

    const handlePrev = () => {
        if (currentPage <= 1) {
            return
        } else {
            setQuery(prev => {
                prev.set('page', `${currentPage - 1}`);
                return prev
            })
        }
    }

    const handleNext = () => {
        if (currentPage >= total_pages) {
            return
        } else {
            setQuery(prev => {
                prev.set('page', `${currentPage + 1}`);
                return prev
            })
        }
    }

    return (
        <div className={css.pagination}>
            <div> {new Intl.NumberFormat().format(countMoviePrev)} ....</div>
            <button disabled={currentPage <= 1} onClick={handlePrev}>Prev</button>
            <button disabled={currentPage >= total_pages} onClick={handleNext}>Next</button>
            <div> ... {new Intl.NumberFormat().format(countMovieNext)} </div>
        </div>
    );
};

export {Pagination};