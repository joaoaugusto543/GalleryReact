import { IoMdAddCircle } from 'react-icons/io'
import './InsertAlbum.css'

type Props = {
    setShowFormAlbum:Function
}

function InsertAlbum({setShowFormAlbum}: Props) {
  return (
    <button className='insertAlbum' onClick={()=>setShowFormAlbum(true)}>
        <IoMdAddCircle/>
    </button>
  )
}

export default InsertAlbum