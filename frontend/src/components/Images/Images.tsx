import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getImages, resetImages } from '../../slices/imagesSlice'
import Image from '../Image/Image'
import './Images.css'
import LoaderImage from '../Loaders/LoaderImage/LoaderImage'
import InsertImage from '../InsertImage/InsertImage'
import FormImage from '../FormImage/FormImage'

type Props = {
    id:string | undefined
}

function Images({id}: Props) {

  const {images,loading}=useAppSelector(state => state.images)
  const {token}= useAppSelector(state => state.auth)
  const [showFormImage,setShowFormImage]=useState<boolean>(false)
  const dispatch=useAppDispatch()

  useEffect(()=>{
    if(token){
        dispatch(resetImages())
        dispatch(getImages({album_id:id,token}))
    }
  },[token,id])

  return (
    <section className='images'>
        <InsertImage setShowFormImage={setShowFormImage}/>
        {loading && <LoaderImage/>}
        {images && images?.map(image => <Image key={image.id} image={image}/>)}
        {showFormImage && id && <FormImage action='create' imageProps={null} setShowFormImage={setShowFormImage} albumId={id}/>}
    </section>
  )
}

export default Images