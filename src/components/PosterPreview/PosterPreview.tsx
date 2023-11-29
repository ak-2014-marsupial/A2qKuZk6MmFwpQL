import React, {FC} from 'react';

import css from "./PosterPreview.module.css";
import {posterBaseUrl} from "../../constants";
import notFound from "../../assets/images/notFound.png"
import {IEvent} from "../../types";

interface IProps {
    poster_path: string,
    title: string,
}

const PosterPreview: FC<IProps> = ({poster_path, title}) => {

    const handleImgError = (event: IEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = notFound;
    }

    return (
        <div className={css.poster_preview}>
            <img src={`${posterBaseUrl}${poster_path}`} alt={title} onError={handleImgError}/>
        </div>
    );
};

export {PosterPreview};

