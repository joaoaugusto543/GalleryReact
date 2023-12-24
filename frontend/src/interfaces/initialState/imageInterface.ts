import image from '../image'

export default interface imageInterface{
    images:image[] | null,
    image:image | null,
    error:null | string | string[] | unknown,
    success:boolean,
    loading:boolean
} 