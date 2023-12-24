import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import imageServices from '../services/imageServices'
import imageInterface from '../interfaces/initialState/imageInterface'

const initialState : imageInterface={
    images:null,
    image:null,
    error:null,
    success:false,
    loading:false
}

export const getImages=createAsyncThunk('images/getImages',async (data:{album_id:string,token:string},thunkAPI)=>{

    const {album_id,token}=data

    const res= await imageServices.getImagens(album_id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

})


const imagesSlice=createSlice({
    name:'images',
    initialState,
    reducers:{
        resetError:function (state){
            state.error=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(getImages.fulfilled,(state,action)=>{
            state.images=action.payload
            state.loading=false
            state.success=true
        })
        .addCase(getImages.pending,(state)=>{
            state.loading=true
        })
        .addCase(getImages.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export const {resetError} = imagesSlice.actions
export default imagesSlice.reducer