import { useState } from 'react'
import { deleteAlbum } from '../../slices/albumsSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import './ConfigAlbum.css'
import Warning from '../Warning/Warning'

type Props = {
  setShowEditForm:Function
  setConfigAlbum:Function
  albumId:string
}

function ConfigAlbum({setShowEditForm,setConfigAlbum,albumId}:Props) {

  const dispatch=useAppDispatch()
  const {token}=useAppSelector(state => state.auth)
  const [showWarning,setShowWarning]=useState<boolean>(false)

  function handleShowFormEditAlbum(){
    setShowEditForm(true)
    setConfigAlbum(false)
  }

  function handleDeleteAlbum(){

    const data:{albumId:string,token:string | null}={
      albumId,
      token
    }
    
    dispatch(deleteAlbum(data))
    setShowWarning(false)
    setConfigAlbum(false)
  }

  return (
    <div className='configAlbum'>
        {showWarning && <Warning setShowWarning={setShowWarning} action={handleDeleteAlbum} text='Tem certeza que deseja deletar esse álbum?'/>}
        <button onClick={()=>setShowWarning(true)}>Excluir</button>
        <button onClick={handleShowFormEditAlbum}>Editar</button>
    </div>
  )
}

export default ConfigAlbum