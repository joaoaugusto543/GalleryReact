import { Route, Routes, Navigate } from 'react-router'
import Home from './Pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { useAppSelector } from './store'

function App() {

  const {user}=useAppSelector((state)=>state.auth)

  return (
    <>
      {user && <NavBar/>}
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>} />
        <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
        <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>} />
      </Routes>
    </>
  )
}

export default App
