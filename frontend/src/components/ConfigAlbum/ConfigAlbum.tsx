import { deleteAlbum } from '../../slices/albumsSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import './ConfigAlbum.css'

type Props = {
  setShowEditForm:Function
  setConfigAlbum:Function
  albumId:string
}

function ConfigAlbum({setShowEditForm,setConfigAlbum,albumId}:Props) {

  const dispatch=useAppDispatch()
  const {token}=useAppSelector(state => state.auth)

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
  }

  return (
    <div className='configAlbum'>
        <button onClick={handleDeleteAlbum}>Excluir</button>
        <button onClick={handleShowFormEditAlbum}>Editar</button>
    </div>
  )
}

export default ConfigAlbum