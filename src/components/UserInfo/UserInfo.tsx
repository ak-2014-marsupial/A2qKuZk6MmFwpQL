import React from 'react';

import avatar from "../../assets/images/astronautpissing.png";
import css from "./UserInfo.module.css"
const UserInfo = () => {
    return (
        <div className={css.user_info}>
            <div className={css.img_container}>
                <img src={avatar} alt=""/>
            </div>
            <div className={css.user}>Dummy User</div>
        </div>
    );
};

export  {UserInfo};