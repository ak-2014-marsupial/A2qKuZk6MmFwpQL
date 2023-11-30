import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IMovieEntries} from "../../interfaces";
import {AxiosError} from "axios";
import {moviesService} from "../../services";

interface IMoveInitialState extends IMovieEntries {
    filter: string;
    loading: boolean;
    errors: boolean,
}

const initialState: IMoveInitialState = {
    page: null,
    results: [],
    total_pages: 0,
    total_results: null,
    filter: null,
    loading: false,
    errors: false,
}

const getAll = createAsyncThunk<IMovieEntries, { page: string }>(
    "movieSlice/getAll",
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const getAllByGenreId = createAsyncThunk<IMovieEntries, { page: string, genreId: string }>(
    "movieSlice/getAllByGenreId",
    async ({page, genreId}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getAllByGenreId(page, genreId);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }

    }
)

const searchMoviesByName = createAsyncThunk<IMovieEntries, { page: string, query: string }>(
    "movieSlice/searchMoviesByName",
    async ({page, query}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.searchMoviesByName(page, query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)


const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },

    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(getAll, getAllByGenreId, searchMoviesByName), (state, action) => {
                const {total_pages, results, page, total_results} = action.payload;
                state.results = results;
                state.total_pages = total_pages;
                state.page = page;
                state.total_results = total_results;
                state.loading = false;
                state.errors = false;
            })
            .addMatcher(isPending(getAll, getAllByGenreId, searchMoviesByName), (state) => {
                state.loading = true;
            })
            .addMatcher(isRejected(getAll, getAllByGenreId, searchMoviesByName), (state) => {
                state.loading = false;
                state.errors = true;

            })
})


const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getAllByGenreId,
    searchMoviesByName,
}

export {
    movieReducer,
    movieActions,
}