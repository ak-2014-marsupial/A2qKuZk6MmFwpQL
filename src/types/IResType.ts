import {AxiosResponse} from "axios";

export type IRes<T> = Promise<AxiosResponse<T>>;

export type IGenres<T> = { genres: T };