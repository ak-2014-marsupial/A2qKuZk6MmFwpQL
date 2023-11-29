export interface IMovie {
    "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number []
    "id": number
    "original_language": string
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
};

export interface IMovieEntries {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
};

export interface IMovieInfo {
    adult: boolean
    backdrop_path: string
    budget: number
    genres: IGenre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProduction_company[]
    production_countries: IProduction_country[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: ISpoken_language[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
};

export interface IGenre {
    id: number
    name: string
};


export interface IProduction_company {
    id: number
    logo_path: string
    name: string
    origin_country: string
};

export interface IProduction_country {
    iso_3166_1: string
    name: string
};

export interface ISpoken_language {
    english_name: string
    iso_639_1: string
    name: string
};

export interface IActorEntries{
    id: number,
    cast: IActor[]
};

export interface  IActor{
       adult:boolean
    cast_id:number
    character:string
    credit_id:string
    gender:number
    id:number
    known_for_department:string
    name:string
    order:number
    original_name:string
    popularity:number
    profile_path:string

}