interface user{
    id:string,
    name:string,
    email:string,
    profile_image:string
}

export default interface userInterface{
    user:null | user,
    success: boolean,
    loading: boolean,
    errors:null | Array<string> | string | unknown
}