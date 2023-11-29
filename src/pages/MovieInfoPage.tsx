import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../hooks";
import {movieInfoActions} from "../redux/slices/movieInfoSlice";
import {MovieInfo} from "../components";

const MovieInfoPage: FC = () => {
    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(movieInfoActions.getMovieInfo({id: movieId}));
        dispatch(movieInfoActions.getActors({id: movieId}));
        return () => {
            dispatch(movieInfoActions.resetMovieInfo());
        }
    }, [dispatch,movieId]);
    return (
        <div>
            <MovieInfo/>
        </div>
    );
};

export {MovieInfoPage};