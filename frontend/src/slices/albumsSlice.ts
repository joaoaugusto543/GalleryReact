import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import albumsServices from '../services/albumsServices'
import { albumsInterface } from '../interfaces/initialState/albumsInterface'


const initialState : albumsInterface={
    albums:null,
    album:null,
    error:null,
    success:false,
    loading:false
}

export const getAlbums=createAsyncThunk('albums/getAlbums',async (data:{token:string},thunkAPI) : Promise<any>=>{
    const {token}=data

    const res=await albumsServices.getAlbums(token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

})

export const createAlbum=createAsyncThunk('albums/createAlbum',async (data:{name:string,token:string | null},thunkAPI) : Promise<any>=>{
    const {token}=data

    const res=await albumsServices.createAlbum(data,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }
    
    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})

export const updateAlbum=createAsyncThunk('albums/updateAlbum',async (data:{name:string,token:string | null,albumId:string | null},thunkAPI) : Promise<any>=>{
    const {token,albumId}=data

    const res=await albumsServices.updateAlbum(data,albumId,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }
    
    if(res.errors){
        return thunkAPI.rejectWithValue(res.errors)
    }

    return res

})


export const deleteAlbum=createAsyncThunk('albums/deleteAlbum',async (data:{token:string | null,albumId:string | null},thunkAPI) : Promise<any>=>{
    const {token,albumId}=data

    const res=await albumsServices.deleteAlbum(albumId,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }
    
    return res

})


const albumsSlice=createSlice({
    name:'albums',
    initialState,
    reducers:{
        resetError:function (state){
            state.error=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(getAlbums.fulfilled,(state,action)=>{
            state.albums=action.payload
            state.loading=false
            state.success=true
        })
        .addCase(getAlbums.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAlbums.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(createAlbum.fulfilled,(state,action)=>{
            state.albums?.push(action.payload)
            state.loading=false
            state.success=true
        })
        .addCase(createAlbum.pending,(state)=>{
            state.loading=true
        })
        .addCase(createAlbum.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(updateAlbum.fulfilled,(state,action)=>{
            state.albums?.map(album => {
                if(album.id === action.payload.id){
                    return album.name=action.payload.name
                }

                return
            })
            state.loading=false
            state.success=true
        })
        .addCase(updateAlbum.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateAlbum.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(deleteAlbum.fulfilled,(state,action)=>{
            state.albums=state.albums?.filter(album => album.id !== action.payload.id)
            state.loading=false
            state.success=true
        })
        .addCase(deleteAlbum.pending,(state)=>{
            state.loading=true
        })
        .addCase(deleteAlbum.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        
    }
})

export const {resetError}=albumsSlice.actions
export default albumsSlice.reducer