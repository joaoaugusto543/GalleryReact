import { useParams } from 'react-router-dom'
import Images from '../../components/Images/Images'
import './Album.css'
import { useAppDispatch, useAppSelector } from '../../store'
import LoaderPage from '../../components/Loaders/LoaderPage/LoaderPage'
import { useEffect } from 'react'
import { getAlbum, resetAlbum } from '../../slices/albumsSlice'
import UseValidatePageAlbum from '../../hooks/UseValidatePageAlbum'
import useTitlePage from '../../hooks/useTitlePage'

function Album() {

  const {id}=useParams()
  const dispatch=useAppDispatch()
  const {album,loading}=useAppSelector(state => state.albums)
  const {token}=useAppSelector(state => state.auth)
  UseValidatePageAlbum()
  useTitlePage()

  useEffect(()=>{

    if(id && token){
      dispatch(resetAlbum())
      dispatch(getAlbum({idAlbum:id,token}))
    }

  },[id,token])

  return (
    <>
      <section className='albumPage'>
        {loading && <LoaderPage/>}
        <h1 className='title'>{album?.name}</h1>
        <Images id={id}/>
        <span className='dateCreate'>Criado em {album?.date}</span>
      </section>
    </>
  )
}

export default Album