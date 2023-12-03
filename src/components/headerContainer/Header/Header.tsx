import React from 'react';
import {useNavigate} from "react-router-dom";

import css from "./Header.module.css"
import {Search} from "../Search";
import {useAppSelector} from "../../../hooks";

const Header = () => {
    const navigate = useNavigate();
    const {isVisible} = useAppSelector(state => state.movieInfo);

    return (
        <div className={css.header}>
            {isVisible && <div className={css.chevron} onClick={() => navigate(-1)}>⬅</div>}
            <Search/>
        </div>
    );
};

export {Header};