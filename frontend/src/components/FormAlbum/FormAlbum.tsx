import { useEffect, useState } from 'react'
import './FormAlbum.css'
import { useAppDispatch, useAppSelector } from '../../store'
import { createAlbum, updateAlbum } from '../../slices/albumsSlice'
import { IoClose } from 'react-icons/io5'

type Props = {
    setShowFormAlbum:Function,
    action:string,
    albumId:string | null,
    nameAlbum:string | null
}

function FormAlbum({setShowFormAlbum,action,albumId,nameAlbum}: Props) {

    const [name,setName]=useState<string>(nameAlbum ? nameAlbum : '')
    const {token}=useAppSelector(state => state.auth)
    const dispatch=useAppDispatch()

    function closeEsc(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'Escape'){
                setShowFormAlbum(false)
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

        const newAlbum:{name:string,token:string | null}={
            name,
            token
        }

        setName('')
        setShowFormAlbum(false)

        if(action==='create'){
            dispatch(createAlbum(newAlbum))
            
        }else{
            dispatch(updateAlbum({...newAlbum,albumId}))
        }
    }


  return (
    <div className='formAlbum'>
        <button className='close' onClick={()=>setShowFormAlbum(false)}><IoClose /></button>
        <div className='formAlbumBox'>
            {action === 'create' ? <h1>Novo Álbum</h1> : <h1>Editar Álbum</h1>}
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type='text' value={name} placeholder='Digite o nome do albúm' onChange={(e)=>setName(e.target.value)}/>
                </label>
                {action === 'create' ? <input type='submit' value='Criar' /> : <input type='submit' value='Editar' />}
            </form>
        </div>
    </div>
  )
}

export default FormAlbum