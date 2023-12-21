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

const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        resetErrors: function(state){
            state.errors=null
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
    },
})

export const {resetErrors}= userSlice.actions
export default userSlice.reducer