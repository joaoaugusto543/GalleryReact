import { Link } from 'react-router-dom'
import image from '../../interfaces/image'
import './Image.css'

type Props = {
    image:image
}

function Image({image}: Props) {

  return (
    <div className='image'>
        <Link to={`${image.id}`}>
            <img src={image.image} alt={image.name} />
            <div className='backgroundImage'>
              {image.name ? <h1>{image.name}</h1> : <h1>(Sem nome)</h1>}
            </div>
        </Link>
    </div>
  )
}

export default Image