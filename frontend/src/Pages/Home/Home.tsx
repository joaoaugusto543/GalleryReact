import Albums from '../../components/Albums/Albums'
import './Home.css'
import useSetTitle from '../../hooks/useSetTitle'

function Home() {

  useSetTitle({title:'GalleryReact'})

  return (
    <section className='home'>
      <h1 className='title'>Álbuns</h1>
      <Albums/>
    </section>
  )
}

export default Home