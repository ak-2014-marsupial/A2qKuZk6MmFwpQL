import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {genreActions, movieActions} from "../../redux/slices";
import {GenreBadge} from "../GenreBadge";
import css from "./SideBar.module.css"

const SideBar = () => {
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({});
    const currentPage = +query.get('page') ? +query.get('page') : 1;

    const {filter} = useAppSelector(state => state.movies);

    const {genres} = useAppSelector(state => state.genres);
    const actionsObject: { [index: string]: any } = {
        "all": (currentPage: number) => dispatch(movieActions.getAll({page: `${currentPage}`})),
        "search": (currentPage: number, param2: string | null) => dispatch(movieActions.searchMoviesByName({
            page: `${currentPage}`,
            query: param2,
        },)),
        "genre": (currentPage: number, param2: string | null) => dispatch(movieActions.getAllByGenreId({
            page: `${currentPage}`,
            genreId: param2,
        }))
    }

    const convertor = (filter: { [index: string]: string } | null): { key: string, param2: string | null } => {
        if (!filter) {
            return {key: "all", param2: null};
        } else {
            const key = Object.keys(filter)[0];
            return {key, param2: filter[key]};
        }
    }

    useEffect(() => {
        dispatch(genreActions.getAll());
    }, [dispatch]);


    useEffect(() => {
        const {key, param2} = convertor(filter);
        actionsObject[key](currentPage, param2)

    }, [currentPage, filter, dispatch]);


    return (
        <div className={css.side_bar}>
            <div className={css.title_list}>Genres</div>
            <div className={css.scroll}>
                {genres && genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
            </div>
        </div>
    );
};

export {SideBar};