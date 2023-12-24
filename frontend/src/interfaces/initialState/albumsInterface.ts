import album from '../album'

export interface albumsInterface{
    albums:album[] | null | undefined,
    album:album | null,
    error:null | string | string[] | unknown,
    success:boolean,
    loading:boolean

}