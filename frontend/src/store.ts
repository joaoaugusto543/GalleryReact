import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlices'
import authReducer from './slices/authSlice'
import albumsReducer from './slices/albumsSlice'
import imagesReducer from './slices/imagesSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store= configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        albums:albumsReducer,
        images:imagesReducer
    }   
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector