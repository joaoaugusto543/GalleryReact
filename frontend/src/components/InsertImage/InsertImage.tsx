import './InsertImage.css'
import { IoMdAddCircle } from 'react-icons/io'

type Props={
    setShowFormImage:Function
}

function InsertImage({setShowFormImage}:Props) {
  return (
    <button className='insertImage' onClick={()=>setShowFormImage(true)}>
        <IoMdAddCircle/>
    </button>
  )
}

export default InsertImage