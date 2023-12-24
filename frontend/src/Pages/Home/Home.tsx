import Albums from '../../components/Albums/Albums'
import './Home.css'

function Home() {
  return (
    <section className='home'>
      <h1 className='title'>Álbuns</h1>
      <Albums/>
    </section>
  )
}

export default Home