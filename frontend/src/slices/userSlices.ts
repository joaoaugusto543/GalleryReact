import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import userInterface from '../interfaces/initialState/userInterface'
import registerInterface from '../interfaces/auth/RegisterInterface'
import { userServices } from '../services/userServices'

const initialState : userInterface={
    user: null,
    success:false,
    loading:false,
    errors:null
}

export const createUser=createAsyncThunk('user/createUser',async (data : registerInterface,thunkAPI) : Promise<any>=>{
    const res =await userServices.createUser(data)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})

export const profile=createAsyncThunk('user/profile',async (data : {token:string},thunkAPI) : Promise<any>=>{

    const {token}=data

    const res =await userServices.profile(token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})

interface userUpdated{
    name?:string,
    newPassword?:string,
    confirmPassword?:string,
    password?:string,
    profile_image?:string
}

export const updateUser=createAsyncThunk('user/updateUser',async (data : {token:string,userUpdated:userUpdated},thunkAPI) : Promise<any>=>{

    const {token,userUpdated}=data

    const res =await userServices.updateUser(userUpdated,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    if(res.message){

        const user:string | null=localStorage.getItem('user')

        if(user){
            return JSON.parse(user)
        }

        return
    }

    localStorage.setItem('user',JSON.stringify(res))

    return res

})

const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        resetErrors: function(state){
            state.errors=null
        },
        resetSuccess: function(state){
            state.success=false
        }
    },
    extraReducers : function(build) {
        build
        .addCase(createUser.fulfilled,(state,action)=>{
            state.user = action.payload
            state.success =  true
            state.loading = false
            state.errors = null
        })
        .addCase(createUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.errors = action.payload
            state.loading = false
        })
        .addCase(profile.fulfilled,(state,action)=>{
            state.user = action.payload
            state.success =  true
            state.loading = false
            state.errors = null
        })
        .addCase(profile.pending,(state)=>{
            state.loading = true
        })
        .addCase(profile.rejected,(state,action)=>{
            state.errors = action.payload
            state.loading = false
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.user = action.payload
            state.success =  true
            state.loading = false
            state.errors = null
        })
        .addCase(updateUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.errors = action.payload
            state.loading = false
        })
    },
})

export const {resetErrors,resetSuccess}= userSlice.actions
export default userSlice.reducer