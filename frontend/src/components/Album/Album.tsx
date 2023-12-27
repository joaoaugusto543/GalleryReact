import { useCallback, useLayoutEffect, useState } from 'react'
import album from '../../interfaces/album'
import {useAppSelector } from '../../store'
import './Album.css'
import { Link } from 'react-router-dom'
import image from '../../interfaces/image'
import imageServices from '../../services/imageServices'
import { upload } from '../../api/api'
import LoaderAlbum from '../Loaders/LoaderAlbum/LoaderAlbum/LoaderAlbum'
import {BsThreeDotsVertical} from 'react-icons/bs'
import ConfigAlbum from '../ConfigAlbum/ConfigAlbum'
import FormAlbum from '../FormAlbum/FormAlbum'

interface props{
    album:album
}

function Album({album}:props) {

  const {token}=useAppSelector(state => state.auth)
  const [images,setImages]=useState<image[]>([])
  const [loading,setLoading]=useState<boolean>(false)
  const [configAlbum,setConfigAlbum]=useState<boolean>(false)
  const [showEditForm,setShowEditForm]=useState<boolean>(false)

  useLayoutEffect(()=>{
    getImages()
  },[album.id,token])

  const getImages=useCallback(async ()=>{
      if(token && album.id){
        setLoading(true)
        const res=await imageServices.getImagens(album.id,token)
        setImages(res)
        setLoading(false)
      }

      return
  },[token,album.id])


  return (
    <div className='Album'>
      {loading && <LoaderAlbum/>}
      {!loading && images &&
        <>
          {!configAlbum ? <button onClick={()=>setConfigAlbum(true)} className='threePoints'><BsThreeDotsVertical/></button> : <button onClick={()=>setConfigAlbum(false)} className='threePoints'><BsThreeDotsVertical/></button>}
          <Link to={`album/${album.id}`}>
            {images && images.length === 0 && <img className='oneImage' src={`${upload}/InvalidImage.png`}/>}
            {images && images.length === 1 && <img className='oneImage' src={images[0].image}/>}
            {images && images.length >= 2 && images.length <=3 &&
              <div className='twoImages'>
                <img src={images[0].image} alt={images[0].name} />
                <img src={images[1].image} alt={images[1].name} />
              </div>
            }
            {images && images.length >= 4 &&
              <div className='fourImages'>
                <img src={images[0].image} alt={images[0].name} />
                <img src={images[1].image} alt={images[1].name} />
                <img src={images[2].image} alt={images[1].name} />
                <img src={images[3].image} alt={images[1].name} />
              </div>
            }
            <div className='backgroundAlbum'>
              <h1>{album.name}</h1>
            </div>
          </Link>
          {configAlbum && <ConfigAlbum albumId={album.id} setConfigAlbum={setConfigAlbum} setShowEditForm={setShowEditForm}/>}
          {showEditForm && <FormAlbum nameAlbum={album.name} albumId={album.id} setShowFormAlbum={setShowEditForm} action='editar'/>}
        </>
      
      }
    </div>
  )
}

export default Album