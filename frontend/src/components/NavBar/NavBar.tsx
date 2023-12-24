import './NavBar.css'
import { IoIosLogOut } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../store'
import { logout } from '../../slices/authSlice'
import { Link } from 'react-router-dom'

function NavBar() {

  const dispatch=useAppDispatch()
  const {user}=useAppSelector(state => state.auth)

  function handleLogout(){
    dispatch(logout())
  }

  return (
    <nav className='navBar'>
        <h1>GalleryReact</h1>
        <button className='logout' onClick={handleLogout}>Sair<IoIosLogOut/></button>
        <Link to='/profile'><img src={user?.profile_image} alt={user?.name} />{user?.name}</Link>
      
    </nav>
  )
}

export default NavBar