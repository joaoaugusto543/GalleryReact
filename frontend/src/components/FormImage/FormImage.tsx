import { useEffect, useState } from 'react'
import './FormImage.css'
import { useAppDispatch, useAppSelector } from '../../store'
import { IoClose } from 'react-icons/io5'
import convertToBase64 from '../../services/convertToBase64'
import { createImages, updateImage } from '../../slices/imagesSlice'

interface image{
    id:string | null | undefined,
    name?: string | null | undefined,
    image: string | null | undefined,
    description?: string | null
}

type Props = {
    setShowFormImage:Function,
    action:string,
    albumId:string | null,
    imageProps:image | null
}

function FormImage({setShowFormImage,action,albumId,imageProps}: Props) {

    const [name,setName]=useState<string>(imageProps?.name ? imageProps.name : '' )
    const [image,setImage]=useState<string | null | undefined>(imageProps?.image)
    const [description,setDescription]=useState<string>(imageProps?.description ? imageProps.description : '')

    const {token}=useAppSelector(state => state.auth)
    const dispatch=useAppDispatch()

    function closeEsc(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'Escape'){
                setShowFormImage(false)
                return
            }
    
            return
        })
  
    }  
    
    useEffect(()=>{
        closeEsc()
        
    },[])
    
    function handleSubmit(e : React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()
        if(albumId && token && image){

            if(action === 'create'){

                interface image{
                    name?:string,
                    description?:string,
                    image:string
                }
        
                interface newImage{
                    album_id:string | undefined,
                    token:string,
                    newImage:image 
                }
                
                const data:newImage={
                    album_id:albumId,
                    token,
                    newImage:{
                        image
                    }
                }
        
                if(name){
                    data.newImage.name=name
                }
        
                if(description){
                    data.newImage.description=description
                }

                dispatch(createImages(data))
                setShowFormImage(false)
                
            }else{
                interface image{
                    id:string
                    name?:string,
                    description?:string
                }
        
                interface newImage{
                    album_id:string | undefined,
                    token:string,
                    updatedImage:image 
                }
                
                if(imageProps?.id){
                    const data:newImage={
                        album_id:albumId,
                        token,
                        updatedImage:{
                            id:imageProps?.id
                        }
                    }
            
                    if(name){
                        data.updatedImage.name=name
                    }
            
                    if(description){
                        data.updatedImage.description=description
                    }
    
                    dispatch(updateImage(data))
                    setShowFormImage(false)
                }
            }
    
        }

        
    }

    async function handleFile(e : React.BaseSyntheticEvent){
        const file : File=e.target.files[0]

        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
            return
        }

        const base64 : string | unknown = await convertToBase64(file)

        if(typeof base64 === 'string'){
            setImage(base64)
        }

    }


  return (
    <div className='formImage'>
        <button className='close' onClick={()=>setShowFormImage(false)}><IoClose /></button>
        <div className='formImageBox'>
            {action === 'create' ? <h1>Nova Foto</h1> : <h1>Editar Foto</h1>}
            {image && <img className='newImage' src={image} alt={name} />}
            <form onSubmit={handleSubmit}>
                {action === 'create' && 
                    <label id='fileImage'>
                        <input type='file' accept='image/*' onChange={handleFile} />
                        {!image ? <span>Adicione uma foto</span> : <span>Alterar foto</span>}
                    </label>
                }
                <label className='labelName'>
                    <span>Nome:</span>
                    <input type='text'  placeholder='Digite o nome da foto(opcional)' value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <label>
                    <span>Descrição:</span>
                    <textarea  placeholder='Digite a descrição da foto(opcional)' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                {action === 'create' ? <input type='submit' value='Adicionar' /> : <input type='submit' value='Editar' />}
            </form>
        </div>
    </div>
  )
}

export default FormImage