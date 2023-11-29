import React, {FC} from 'react';

import css from "./ActorListCard.module.css";
import {PosterPreview} from "../../PosterPreview";
import {posterBaseUrl} from "../../../constants";
import {IActor} from "../../../interfaces";

interface IProps {
    actor: IActor
}

const ActorListCard: FC<IProps> = ({actor}) => {
    const {cast_id, original_name, profile_path} = actor;
    const imgPath = profile_path ? `${posterBaseUrl}${profile_path}` : '';

    return (
        <div >
            <div className={css.wrap_image}>
                <PosterPreview key={cast_id} title={original_name} poster_path={imgPath}/>
            </div>
            <div className={css.title}>{original_name}</div>
        </div>
    );
};

export {ActorListCard};