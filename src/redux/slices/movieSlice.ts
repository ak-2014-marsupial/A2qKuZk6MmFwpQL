import {createAsyncThunk, createSlice, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {IMovieEntries} from "../../interfaces";
import {AxiosError} from "axios";
import {moviesService} from "../../services";

interface IMoveInitialState extends IMovieEntries {
    filter: string;
}

const initialState: IMoveInitialState = {
    page: null,
    results: [],
    total_pages: 0,
    total_results: null,
    filter: null,
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
            // .addCase(getAll.fulfilled, (state, {payload}) => {
            //     state.results = payload.results;
            //     state.total_pages = payload.total_pages;
            //     state.page = payload.page;
            //     state.total_results = payload.total_results;
            // })
            // .addCase(getAllByGenreId.fulfilled, (state, {payload}) => {
            //     state.results = payload.results;
            //     state.total_pages = payload.total_pages;
            //     state.page = payload.page;
            //     state.total_results = payload.total_results;
            // })
            // .addCase(searchMoviesByName.fulfilled, (state, {payload}) => {
            //     state.results = payload.results;
            //     state.total_pages = payload.total_pages;
            //     state.page = payload.page;
            //     state.total_results = payload.total_results;
            // })
            .addMatcher(isFulfilled(getAll,getAllByGenreId,searchMoviesByName),(state,action)=>{
                const {total_pages,results,page,total_results} = action.payload;
                state.results = results;
                state.total_pages = total_pages;
                state.page = page;
                state.total_results = total_results;
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