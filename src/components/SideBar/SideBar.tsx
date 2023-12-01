import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {genreActions, movieActions} from "../../redux/slices";
import {GenreBadge} from "../GenreBadge";

import css from "./SideBar.module.css"

const SideBar = () => {
    const dispatch = useAppDispatch();
    const [selectedGenreId, setSelectedGenreId] = useState(null)

    const [query] = useSearchParams({});
    const currentPage = +query.get('page') ? +query.get('page') : 1;

    // const currentFilter: string = query.get('filter');

    const {filter: currentFilter} = useAppSelector(state => state.movies);

    useEffect(() => {
        dispatch(genreActions.getAll());
    }, [dispatch]);

    const actionsObject: { [index: string]: any } = {
        "all": (currentPage: number) => dispatch(movieActions.getAll({page: `${currentPage}`})),
        "search": (currentPage: number, param2: string | null) => dispatch(movieActions.searchMoviesByName({
            page: `${currentPage}`,
            query: param2
        },)),
        "genre": (currentPage: number, param2: string | null) => dispatch(movieActions.getAllByGenreId({
            page: `${currentPage}`,
            genreId: param2
        }))
    }

    const convertStringToTuple = (filter: string | null): [key: string, param2: string | null] => {
        if (!filter || filter.length < 11) {
            return ["all", null];
        } else return [filter.slice(0, 9).trim(), filter.slice(10).trim()];
    }


    useEffect(() => {
        const [key, param2] = convertStringToTuple(currentFilter);
        actionsObject[key](currentPage, param2)

        setSelectedGenreId(currentFilter && (+currentFilter.slice(10).trim()));

    }, [currentPage, currentFilter, dispatch]);

    const {genres} = useAppSelector(state => state.genres);

    return (
        <div className={css.side_bar}>
            <div className={css.title_list}>Genres</div>
            <div className={css.scroll}>
                {genres && genres.map(genre => <GenreBadge key={genre.id} genre={genre}
                                                           selectedGenre={selectedGenreId}/>)}

            </div>
        </div>
    );
};

export {SideBar};