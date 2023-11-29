export interface IColor{
    background: string,
    textPrimary: string,
    textSecondary: string,
    accent: string,
    accentHover: string,
    border: string,
    shadow: string,
    starPrimary: string,
    starSecondary: string,
}
export interface  ITheme{
    name:string,
    colors:IColor,
}