import './NavBar.css'
import { IoIosLogOut } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../store'
import { logout } from '../../slices/authSlice'
import { Link } from 'react-router-dom'
import useGetUser from '../../hooks/useGetUser';
import MiniCharging from '../Loaders/MiniCharging/MiniCharging';

function NavBar() {

  useGetUser()
  const dispatch=useAppDispatch()
  const {user,loading}=useAppSelector(state => state.user)

  function handleLogout(){
    dispatch(logout())
  }

  return (
    <nav className='navBar'>
        <div className='logo'>
          <Link to='/'>
            <h1>GalleryReact</h1>
          </Link>
        </div>
        <button className='logout' onClick={handleLogout}>Sair<IoIosLogOut/></button>
        {!loading ? <Link to='/profile'><img src={user?.profile_image} alt={user?.name} />
          <div className='userName'>
            {user?.name}
          </div>
        </Link> : <MiniCharging/>}
      
    </nav>
  )
}

export default NavBar