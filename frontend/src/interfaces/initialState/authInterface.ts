interface user{
    id: string,
    name : string,
    profile_image : string
}

export default interface authInterface{
    user: user | null,
    token: string | null,
    error: string | null | unknown,
    success: boolean,
    loading: boolean
}