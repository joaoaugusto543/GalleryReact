export default interface registerInterface{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    profile_image?:string | null | unknown ,
}