import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { deleteImage, getImage, resetImage } from '../../slices/imagesSlice'
import LoaderPage from '../../components/Loaders/LoaderPage/LoaderPage'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import './Image.css'
import FormImage from '../../components/FormImage/FormImage'
import Warning from '../../components/Warning/Warning'
import UseValidatePageImage from '../../hooks/UseValidatePageImage'

function Image() {

  const {albumId,imageId}=useParams()
  const {token}=useAppSelector(state => state.auth)
  const {image,loading}=useAppSelector(state => state.images)
  const [showFormImage,setShowFormImage]=useState<boolean>(false)
  const [showWarning,setShowWarning]=useState<boolean>(false)
  const navigate=useNavigate()
  const dispatch = useAppDispatch()
  UseValidatePageImage()
  
  useEffect(()=>{

    if(albumId && imageId && token){

        dispatch(resetImage())

        const data={
            album_id:albumId,
            image_id:imageId,
            token
        }

        dispatch(getImage(data))
   
    }

  },[albumId,imageId])

  async function handleDeleteImage(){

    if(albumId && imageId && token){

      const data={
        album_id:albumId,
        image_id:imageId,
        token
      }

      await dispatch(deleteImage(data))
      navigate(`/album/${albumId}`)
    }

  }

  
  return (
    <section className='imagePage'>
        {showWarning && <Warning setShowWarning={setShowWarning} action={handleDeleteImage} text='Tem certeza que deseja deletar essa imagem?'/>}
        {showFormImage && albumId && image && <FormImage action='edit' setShowFormImage={setShowFormImage} albumId={albumId} imageProps={image} />}
        <div className='buttonsImage'>
            <button onClick={()=>setShowFormImage(true)}><MdModeEditOutline />Editar</button>
            <button onClick={()=>setShowWarning(true) }><MdDelete />Excluir</button>
        </div>
        {loading && <LoaderPage/>}
        {image?.name ? <h1 id='titleImagePage' className='title'>{image.name}</h1> : <h1 id='titleImagePage' className='title'>(Sem nome)</h1>}
        <img src={image?.image} alt={image?.name} />
        <div className='divDescription'>
            {image?.description ? <p>{image.description}</p> : <p>(Sem descrição)</p>}
        </div>
        <span className='dateCreate'>Criado em {image?.date}</span>
    </section>
  )
}

export default Image