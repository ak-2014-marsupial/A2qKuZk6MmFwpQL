import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IActor, IActorEntries, IMovieInfo} from "../../interfaces";
import {AxiosError} from "axios";
import {moviesService} from "../../services";

interface IMovieInfoState {
    movieInfo: IMovieInfo,
    actors: IActor[],
}

const initialState: IMovieInfoState = {
    movieInfo: null,
    actors: null,
}
const getMovieInfo = createAsyncThunk<IMovieInfo, { id: string }>(
    "movieInfoSlice/getMovieInfo",
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const getActors = createAsyncThunk<IActorEntries, { id: string }>(
    "movieInfoSlice/getActors",
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getActorsByFilmId(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)


const movieInfoSlice = createSlice({
    name: "movieInfoSlice",
    initialState,
    reducers: {
        resetMovieInfo: (state) => {
            state.movieInfo = null;
            state.actors = [];
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getMovieInfo.fulfilled, (state, {payload}) => {
                state.movieInfo = payload;
            })
            .addCase(getActors.fulfilled, (state, {payload}) => {
                state.actors = payload.cast;
            })
});

const {reducer: movieInfoReducer, actions} = movieInfoSlice;


const movieInfoActions = {
    ...actions,
    getMovieInfo,
    getActors,
}

export {
    movieInfoActions,
    movieInfoReducer,
}