import axios from 'axios'

export const api=axios.create({
    baseURL:'http://localhost:3001/api/'
})

export const upload : string ='http://localhost:3001/imgs/'


