import React from 'react';

import image from "../../../assets/images/somethinWentWrong.png";
import css from "./Error.module.css";
const ErrorPage = () => {
    return (
        <div className={css.error}>
            <div>
                <img src={image} alt="Something went wrong"/>
            </div>
            <h1>
                Something Went Wrong !
            </h1>

        </div>
    );
};

export  {ErrorPage};