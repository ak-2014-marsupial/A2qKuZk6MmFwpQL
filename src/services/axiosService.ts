import axios from "axios";
import {baseURL,token} from "../constants/urls";

const axiosService = axios.create({
    baseURL,
});

axiosService.interceptors.request.use(req => {
    req.headers.Authorization = token;
    return req;
})

export {
    axiosService
}

