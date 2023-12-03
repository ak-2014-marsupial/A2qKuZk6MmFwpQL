const title:{[index:string]:string}={
    "all":"",
    "search":"Show All Movies",
    "genre":"Show All Genres",
}
export const convertor = (filter: { [index: string]: string } | null): { key: string, param2: string | null,title:string } => {
    if (!filter) {
        return {key: "all", param2: null,title:""};
    } else {
        const key = Object.keys(filter)[0];
        return {key, param2: filter[key],title:title[key]};
    }
}