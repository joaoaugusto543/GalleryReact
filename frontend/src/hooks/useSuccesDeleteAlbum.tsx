import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { resetSuccess } from '../slices/albumsSlice'

function useSuccesDeleteAlbum() {

    const dispatch=useAppDispatch()
    const {success} = useAppSelector(state => state.albums)
  
    useEffect(()=>{
        if(success){
            dispatch(resetSuccess())
            console.log('bdbdb')
        }
    },[success])

}

export default useSuccesDeleteAlbum