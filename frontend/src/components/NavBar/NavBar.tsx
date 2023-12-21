import { CiLogout } from 'react-icons/ci'
import './NavBar.css'
import { useAppDispatch } from '../../store'
import { logout } from '../../slices/authSlice'

function NavBar() {

  const dispatch=useAppDispatch()


  function handleLogout(){
    dispatch(logout())
  }

  return (
    <nav className='navBar'>
        <h1>GalleryReact</h1>
        <button className='logout' onClick={handleLogout}><CiLogout/>Sair</button>
    </nav>
  )
}

export default NavBar