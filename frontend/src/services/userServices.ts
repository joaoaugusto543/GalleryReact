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

export const userServices={
    createUser
}