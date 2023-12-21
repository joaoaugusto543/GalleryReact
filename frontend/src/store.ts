import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlices'
import authReducer from './slices/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store= configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer
    }   
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector