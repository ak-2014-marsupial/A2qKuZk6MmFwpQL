import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {genreReducer} from "./slices";
import {movieInfoReducer} from "./slices/movieInfoSlice";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres:genreReducer,
        movieInfo:movieInfoReducer,
    }
});

export {
    store
}