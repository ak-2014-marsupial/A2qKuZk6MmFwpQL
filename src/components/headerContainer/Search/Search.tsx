import React from 'react';
import {useForm} from "react-hook-form";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import css from "./Search.module.css";
import icon from "../../../assets/images/search_find.png"
import {useAppDispatch} from "../../../hooks";
import {movieActions} from "../../../redux/slices";

const Search = () => {
    const {register, handleSubmit, reset} = useForm();
    const [, setQuery] = useSearchParams();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleSearch = (txt: { search: string }) => {
        if (txt.search.trim().length > 0) {
            // dispatch(movieActions.setFilter(`   search=${txt.search}`));
            dispatch(movieActions.setFilter({search:`${txt.search}`}));
            setQuery(prev => {
                if (!(location.pathname === "/movies")) {
                    navigate("/movies")
                }
                prev.set('filter', `   search=${txt.search}`);
                prev.set('page', `1`);
                return prev
            })
            reset();
        } else {
            reset();
        }
    }
    return (
        <form className={css.search} onSubmit={handleSubmit(handleSearch)}>
            <div><input type="text" name={"search"} placeholder={"search"} {...register('search')}/></div>
            <button>
                <div className={css.wrap_img}><img src={icon} alt="Search"/></div>
            </button>
        </form>
    );
};

export {Search};

