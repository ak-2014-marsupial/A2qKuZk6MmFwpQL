import React, {FC} from 'react';

import css from './GenreBadge.module.css'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {IGenre} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {movieActions} from "../../redux/slices";

interface IProps {
    genre: IGenre,
    selectedGenre?: number,
}

const GenreBadge: FC<IProps> = ({genre: {id, name}, selectedGenre}) => {
    const [, setQuery] = useSearchParams({"filter": null});
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (genreId: string) => {
        if(`${selectedGenre}`===genreId) return;
        dispatch(movieActions.setFilter( `    genre=${genreId}`));
        if(!(location.pathname ==="/movies")){
            navigate("/movies")
        }
        setQuery(prev => {
            prev.set('filter', `    genre=${genreId}`);
            prev.set('page',"1");
            return prev
        })

    }

    return (
        <div className={[css.genre_badge, selectedGenre === id ? css.selected : ""].join(" ")}
             onClick={() => handleClick(`${id}`)}>
            {name}
        </div>

    );
}

export {GenreBadge};