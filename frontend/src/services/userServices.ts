import { api } from '../api/api';
import registerInterface from '../interfaces/auth/RegisterInterface';

async function createUser(user : registerInterface) : Promise<any>{

    try {
        
        const response= await api.post('users/',user)
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

async function profile(token:string){
    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.get('users/')
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

interface userUpdated{
    name?:string,
    newPassword?:string,
    confirmPassword?:string,
    password?:string,
    profile_image?:string
}

async function updateUser(userUpdated : userUpdated,token:string) : Promise<any>{

    try {

        console.log(userUpdated)

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response= await api.put('users/',userUpdated)
    
        const data = response.data
    
        return data

    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data
    }
}

export const userServices={
    createUser,
    profile,
    updateUser
}