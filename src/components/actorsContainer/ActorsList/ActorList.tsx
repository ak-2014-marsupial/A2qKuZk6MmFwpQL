import React, {FC} from 'react';

import {ActorListCard} from "../ActorListCard";
import css from "./ActorsList.module.css";
import {useAppSelector} from "../../../hooks";
import {Loader} from "../../Loader";


const ActorList: FC = () => {

    const {actors,loadingActors} = useAppSelector(state => state.movieInfo);
    if(loadingActors)return <Loader/>
    return (
        <>
            <h2>Actors list:</h2>
            <div className={css.actor_list}>
                {actors && actors.map(actor => <ActorListCard key={actor.id} actor={actor}/>
                )}
            </div>
        </>
    );
};

export {ActorList};