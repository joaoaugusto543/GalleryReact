import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { profile } from '../slices/userSlices'

function useGetUser() {

    const {token}=useAppSelector(state => state.auth)
    const dispatch=useAppDispatch()

    useEffect(()=>{
        if(token){
            dispatch(profile({token}))
        }
    },[token])

}

export default useGetUser