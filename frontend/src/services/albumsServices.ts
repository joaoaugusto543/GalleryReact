import { api } from '../api/api'

async function getAlbums(token:string) : Promise<any>{

    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.get('albums/')
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

async function createAlbum(newAlbum:{name:string},token:string | null) : Promise<any>{

    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.post('albums/',newAlbum)
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

async function updateAlbum(updatedAlbum:{name:string},albumId:string | null,token:string | null) : Promise<any>{

    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.put(`albums/${albumId}`,updatedAlbum)
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

async function deleteAlbum(albumId:string | null,token:string | null) : Promise<any>{

    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.delete(`albums/${albumId}`)
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

const albumsServices={
    getAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum
}

export default albumsServices