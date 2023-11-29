import React, {FC} from 'react';

import StarRatings from "react-star-ratings";

import css from "./MovieInfo.module.css";
import "../../../constants/var.css";
import {PosterPreview} from "../../PosterPreview";
import {GenreBadge} from "../../GenreBadge";
import {ActorList} from "../../actorsContainer";
import {useAppSelector} from "../../../hooks";
import {Loader} from "../../Loader";


const MovieInfo: FC = () => {

    const {movieInfo} = useAppSelector(state => state.movieInfo);

    if (!movieInfo) return <Loader/>

    const {poster_path, title, release_date, vote_average, genres, runtime, overview} = movieInfo;
    return (
        <div className={css.movie_info}>
            <div className={css.wrap_image}>
                <PosterPreview poster_path={poster_path} title={title}/>
            </div>
            <div className={css.title}>{title}</div>
            <div className={css.content}>{overview}</div>
            <StarRatings starRatedColor='var(--star-primary)'
                         starEmptyColor='var(--star-secondary'
                         numberOfStars={10}
                         starDimension={'25px'}
                         starSpacing={'1px'}
                         rating={vote_average}
            />
            <div className={css.genre_container}>
                {genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
            </div>
            <div className={css.content}>Duration {runtime} min</div>
            <div className={css.content}>Release date {release_date} </div>
            <ActorList/>

        </div>
    );
};

export {MovieInfo};