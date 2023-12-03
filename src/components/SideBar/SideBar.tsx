import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {genreActions, movieActions} from "../../redux/slices";
import {GenreBadge} from "../GenreBadge";
import {convertor} from "../utils";
import css from "./SideBar.module.css"
import {UserInfo} from "../UserInfo";
import {Switch} from "../headerContainer";

const SideBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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


    useEffect(() => {
        dispatch(genreActions.getAll());
    }, [dispatch]);
    const helper = convertor(filter);


    useEffect(() => {
        actionsObject[helper.key](currentPage, helper.param2);
    }, [currentPage, filter, dispatch]);

    const handleClick = () => {
        dispatch(movieActions.setFilter(null));
        navigate("/movies")
    }

    return (
        <div className={css.side_bar}>
            <UserInfo/>
            <Switch/>
            {helper.param2 && <div className={css.helper} onClick={handleClick}>{helper.title}</div>}
            <div className={css.title_list}>Genres</div>
            <div className={css.scroll}>
                {genres && genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
            </div>
        </div>
    );
};

export {SideBar};

// [css.helper, helper.key?css.visible:""].join(" ")

