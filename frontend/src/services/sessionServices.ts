import loginInterface from '../interfaces/auth/LoginInterface'
import { api } from '../api/api'

async function login(login:loginInterface) : Promise<any> {

    try {
        const response=await api.post('session/',login)

        const data=response.data

        console.log(data)

        return data
        
    } catch (error : any) {

        const data = error.response.data

        console.log(data)

        return data

    }
}

export const sessionServices={
    login
}