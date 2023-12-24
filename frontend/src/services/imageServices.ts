import { api } from '../api/api'

async function getImagens(album_id:string,token:string) : Promise<any>{
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

const imageServices={
    getImagens
}

export default imageServices