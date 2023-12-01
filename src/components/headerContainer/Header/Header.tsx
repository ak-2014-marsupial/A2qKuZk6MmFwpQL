import React from 'react';
import {useNavigate} from "react-router-dom";

import {UserInfo} from "../../UserInfo";
import {Switch} from "../Switch";
import css from "./Header.module.css"
import {Search} from "../Search";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {movieActions} from "../../../redux/slices";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isVisible} = useAppSelector(state => state.movieInfo);

    const handleClick = () => {
        dispatch(movieActions.setFilter(null));
        navigate("/movies")
    }
    return (
        <nav className={css.header}>
            <div className={css.col_1}>
                {isVisible && <div className={css.chevron} onClick={() => navigate(-1)}>⬅</div>}
                <div onClick={handleClick}>Movies</div>
                <Search/>
            </div>
            <div className={css.col_2}>
                <Switch/>
                <div className={css.avatar}>
                    <UserInfo/>
                </div>
            </div>

        </nav>
    );
};

export {Header};