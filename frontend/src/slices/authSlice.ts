import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import loginInterface from '../interfaces/auth/LoginInterface'
import { sessionServices } from '../services/sessionServices'
import authInterface from '../interfaces/initialState/authInterface'

const user : string | null = localStorage.getItem('user')
const token : string | null = localStorage.getItem('token')

const initialState : authInterface={
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    error: null,
    success: false,
    loading:false
}

export const login=createAsyncThunk('auth/login',async (data : loginInterface,thunkAPI) : Promise<any>=>{

    const res= await sessionServices.login(data)

    if(res.authenticationError){
        return thunkAPI.rejectWithValue(res.authenticationError)
    }

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    localStorage.setItem('user',JSON.stringify(res.user))
    localStorage.setItem('token',res.token)

    return res
})

export const logout=createAsyncThunk('auth/logout',()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload()
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetError:function (state){
            state.error=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(login.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
            state.success=true
            state.loading=false
            state.error=null
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
            state.token=null
            state.error=null
            state.loading=false
        })
    }
})

export const {resetError}=authSlice.actions
export default authSlice.reducer