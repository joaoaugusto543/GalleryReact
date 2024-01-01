import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { resetSuccess } from '../slices/albumsSlice'

type Props={
    setName:Function,
    setShowFormAlbum:Function
}

function useSuccessFormAlbum({setName,setShowFormAlbum}:Props) {

  const {success} = useAppSelector( state => state.albums)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(success){
        setName('')
        setShowFormAlbum(false)
        dispatch(resetSuccess())
    }
  },[success])

}

export default useSuccessFormAlbum