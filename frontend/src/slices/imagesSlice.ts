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

export const getImages=createAsyncThunk('images/getImages',async (data:{album_id:string | undefined,token:string},thunkAPI)=>{

    const {album_id,token}=data

    const res= await imageServices.getImagens(album_id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

})

interface newImage{
    name?:string,
    description?:string,
    image:string
 
}

export const createImages=createAsyncThunk('images/createImages',async (data:{album_id:string | undefined,token:string,newImage:newImage},thunkAPI)=>{

    const {album_id,token,newImage}=data

    const res= await imageServices.createImagem(newImage,album_id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})

export const getImage=createAsyncThunk('images/getImage',async (data:{image_id:string,album_id:string,token:string},thunkAPI)=>{

    const {album_id,token,image_id}=data

    const res= await imageServices.getImage(image_id,album_id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

})

interface updatedImage{
    id:string,
    name?:string,
    description?:string
}

export const updateImage=createAsyncThunk('images/updateImage',async (data:{album_id:string | undefined,token:string,updatedImage:updatedImage},thunkAPI)=>{

    const {album_id,token,updatedImage}=data

    const res= await imageServices.UpdateImagem(updatedImage,album_id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})

export const deleteImage=createAsyncThunk('images/deleteImage',async (data:{image_id:string,album_id:string,token:string},thunkAPI)=>{

    const {album_id,token,image_id}=data

    const res= await imageServices.deleteImage(image_id,album_id,token)

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
        },
        resetImages:function (state){
            state.images=null
        },
        resetImage:function (state){
            state.image=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(getImages.fulfilled,(state,action)=>{
            state.images=action.payload
            state.loading=false
            state.success=true
            state.error=null
        })
        .addCase(getImages.pending,(state)=>{
            state.loading=true
        })
        .addCase(getImages.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(createImages.fulfilled,(state,action)=>{
            state.images?.push(action.payload)
            state.loading=false
            state.success=true
            state.error=null
        })
        .addCase(createImages.pending,(state)=>{
            state.loading=true
        })
        .addCase(createImages.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(getImage.fulfilled,(state,action)=>{
            state.image=action.payload
            state.loading=false
            state.success=true
            state.error=null
        })
        .addCase(getImage.pending,(state)=>{
            state.loading=true
        })
        .addCase(getImage.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(updateImage.fulfilled,(state,action)=>{
            state.image=action.payload
            state.loading=false
            state.success=true
            state.error=null
        })
        .addCase(updateImage.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateImage.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(deleteImage.fulfilled,(state,action)=>{
            state.image=null
            state.images=state.images?.filter(image => image.id !== action.payload.id)
            state.loading=false
            state.success=true
            state.error=null
        })
        .addCase(deleteImage.pending,(state)=>{
            state.loading=true
        })
        .addCase(deleteImage.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export const {resetError,resetImages,resetImage} = imagesSlice.actions
export default imagesSlice.reducer