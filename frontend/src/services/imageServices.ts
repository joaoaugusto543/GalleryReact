import { api } from '../api/api'

async function getImagens(album_id:string | undefined,token:string) : Promise<any>{
    try {

        api.defaults.headers.authorization=`Bearer ${token}`

        const res=await api.get(`images/${album_id}`)

        const data=res.data

        return data
        
    } catch (error : any) {
        const data=error.response.data
        return data
    }
}

async function getImage(image_id:string,album_id:string,token:string) : Promise<any>{
    try {

        api.defaults.headers.authorization=`Bearer ${token}`

        const res=await api.get(`images/${album_id}/${image_id}`)

        const data=res.data

        return data
        
    } catch (error : any) {
        const data=error.response.data
        return data
    }
}

interface newImage{
    name?:string,
    description?:string,
    image:string
}

async function createImagem(newImage:newImage,album_id:string | undefined,token:string) : Promise<any>{
    try {

        api.defaults.headers.authorization=`Bearer ${token}`

        const res=await api.post(`images/${album_id}`,newImage)

        const data=res.data

        return data
        
    } catch (error : any) {
        const data=error.response.data
        return data
    }
}

interface updatedImage{
    id:string,
    name?:string,
    description?:string
}

async function UpdateImagem(updatedImage:updatedImage,album_id:string | undefined,token:string) : Promise<any>{
    try {

        api.defaults.headers.authorization=`Bearer ${token}`

        const res=await api.put(`images/${album_id}/${updatedImage.id}`,updatedImage)

        const data=res.data

        return data
        
    } catch (error : any) {
        const data=error.response.data
        return data
    }
}

async function deleteImage(image_id:string,album_id:string,token:string) : Promise<any>{
    try {

        api.defaults.headers.authorization=`Bearer ${token}`

        const res=await api.delete(`images/${album_id}/${image_id}`)

        const data=res.data

        return data
        
    } catch (error : any) {
        const data=error.response.data
        return data
    }
}

const imageServices={
    getImagens,
    createImagem,
    getImage,
    UpdateImagem,
    deleteImage
}

export default imageServices