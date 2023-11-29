import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre} from "../../interfaces";
import {AxiosError} from "axios";
import {moviesService} from "../../services";

interface IInit{
    genres:IGenre[],
}

const initialState:IInit = {
    genres:[]
};

const getAll = createAsyncThunk<IGenre[], void>(
    "genreSlice/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getGenres();
            return data.genres;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const genreSlice = createSlice({
    name: "genreSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, {payload}) => {
                state.genres = payload;
            })
});


const {reducer: genreReducer, actions} = genreSlice;

const genreActions = {
    ...actions,
    getAll,
}

export {
    genreActions,
    genreReducer,
}