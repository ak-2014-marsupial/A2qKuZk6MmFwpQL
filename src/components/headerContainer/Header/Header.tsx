import React from 'react';
import {useNavigate} from "react-router-dom";

import {UserInfo} from "../../UserInfo";
import {Switch} from "../Switch";
import css from "./Header.module.css"
import {Search} from "../Search";
import {useAppSelector} from "../../../hooks";

const Header = () => {
    const navigate = useNavigate();
    const {isVisible} = useAppSelector(state => state.movieInfo);

    return (
        <div className={css.header}>
            <div className={css.col_1}>
                {isVisible && <div className={css.chevron} onClick={() => navigate(-1)}>⬅</div>}
                <Search/>
            </div>
            <div className={css.col_2}>
                <Switch/>
                <div className={css.avatar}>
                    <UserInfo/>
                </div>
            </div>

        </div>
    );
};

export {Header};