import { useEffect, useState } from 'react'
import './FormAlbum.css'
import { useAppDispatch, useAppSelector } from '../../store'
import { createAlbum, resetError, updateAlbum } from '../../slices/albumsSlice'
import { IoClose } from 'react-icons/io5'
import useShowErrorsAlbum from '../../hooks/useShowErrorsAlbum'
import useSuccessFormAlbum from '../../hooks/useSuccessFormAlbum'

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
    const {errorName} = useShowErrorsAlbum()
    useSuccessFormAlbum({setName,setShowFormAlbum})

    function closeEsc(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'Escape'){
                setShowFormAlbum(false)
                setName('')
                dispatch(resetError())
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

        if(action==='create'){
            dispatch(createAlbum(newAlbum))
            
        }else{
            dispatch(updateAlbum({...newAlbum,albumId}))
        }
    }

    function handleClose(){
        setShowFormAlbum(false)
        dispatch(resetError())
        setName('')
    }


  return (
    <div className='formAlbum'>
        <button className='close' onClick={handleClose}><IoClose /></button>
        <div className='formAlbumBox'>
            {action === 'create' ? <h1>Novo Álbum</h1> : <h1>Editar Álbum</h1>}
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type='text' value={name} placeholder='Digite o nome do álbum' onChange={(e)=>setName(e.target.value)}/>
                    {errorName && <p className='error'>{errorName}</p>}
                </label>
                {action === 'create' ? <input type='submit' value='Criar' /> : <input type='submit' value='Editar' />}
            </form>
        </div>
    </div>
  )
}

export default FormAlbum