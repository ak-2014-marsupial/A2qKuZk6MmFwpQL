
const baseURL:string='https://api.themoviedb.org/3'
const posterBaseUrl:string = "https://image.tmdb.org/t/p/w500";
const token:string= process.env.REACT_APP_TOKEN;
const api_key:string= process.env.REACT_APP_API_KEY;

const movie:string="/movie"
const urls={
    getMovies:`discover${movie}`,
    getPopularMovie:`${movie}/popular`,
    searchMovie:`/search${movie}`,
    getMovieDetails:(id:string):string=>`${movie}/${id}`,
    getMoviesByGenreId:(genreId:string):string=>`/genre/${genreId}/movies`,
    getGenres:`/genre/list`,
    getActorsByFilmId:(id:string):string=> `${movie}/${id}/credits`,

}

export {
    baseURL,
    posterBaseUrl,
    urls,
    api_key,
    token

}