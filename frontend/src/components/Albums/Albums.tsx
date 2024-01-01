import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAlbums } from '../../slices/albumsSlice'
import './Albums.css'
import Album from '../Album/Album'
import InsertAlbum from '../InsertAlbum/InsertAlbum'
import FormAlbum from '../FormAlbum/FormAlbum'
import LoaderPage from '../Loaders/LoaderPage/LoaderPage'
import useSuccesDeleteAlbum from '../../hooks/useSuccesDeleteAlbum'

function Albums() {

    const {albums,loading}=useAppSelector(state => state.albums)
    const {token}=useAppSelector( state => state.auth)
    const dispatch=useAppDispatch()
    const [showFormAlbum,setShowFormAlbum]=useState<boolean>(false)
    useSuccesDeleteAlbum()

    useEffect(()=>{
        if(token){
          dispatch(getAlbums({token}))
        }
    },[token])

  return (
    <div className='albums'>
      {loading && <LoaderPage/>}
      <InsertAlbum setShowFormAlbum={setShowFormAlbum}/>
      {albums?.map(album => <Album key={album.id} album={album}/>)}
      {showFormAlbum && <FormAlbum nameAlbum={null} albumId={null} action='create' setShowFormAlbum={setShowFormAlbum}/>}
    </div>
  )
}

export default Albums