import React, {FC, useEffect, useState} from 'react';

import css from "./Switch.module.css"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const Switch: FC = () => {
    const storedTheme: string = localStorage.getItem('theme');
    const [theme, setTheme] = useState(storedTheme ? storedTheme : 'light');

    const handleChange = (e: ChangeEvent) => {
        setTheme(e.target.checked ? 'dark' : 'light');
        localStorage.setItem("theme", e.target.checked ? 'dark' : 'light');
    };


    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme, storedTheme]);

    return (
        <div className={css.container_switch}>
            <div className={css.title}>Change Theme</div>
            <label className={css.switch}>
                <input type="checkbox" onChange={handleChange} checked={theme === 'dark'}/>
                <span className={css.slider}></span>
            </label>
        </div>
    );
};

export {Switch};