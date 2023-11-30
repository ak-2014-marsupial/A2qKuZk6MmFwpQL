import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";

import {IActor, IActorEntries, IMovieInfo} from "../../interfaces";
import {AxiosError} from "axios";
import {moviesService} from "../../services";

interface IMovieInfoState {
    movieInfo: IMovieInfo,
    actors: IActor[],
    loadingMovieInfo: boolean,
    loadingActors: boolean,
    errors: boolean,
}

const initialState: IMovieInfoState = {
    movieInfo: null,
    actors: null,
    loadingActors: false,
    loadingMovieInfo: false,
    errors: false,
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
                state.loadingMovieInfo = false;
                state.errors=false;
            })
            .addCase(getMovieInfo.pending, (state) => {
                state.loadingMovieInfo = true;
            })
            .addCase(getActors.fulfilled, (state, {payload}) => {
                state.actors = payload.cast;
                state.loadingActors = false;
                state.errors=false;
            })
            .addCase(getActors.pending, (state) => {
                state.loadingActors = true;
            })
            .addMatcher(isRejected(getMovieInfo, getActors), (state) => {
                state.loadingActors = false;
                state.loadingMovieInfo = false;
                state.errors = true;
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