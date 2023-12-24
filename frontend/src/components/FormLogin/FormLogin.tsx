import { useState } from 'react'
import loginInterface from '../../interfaces/auth/LoginInterface'
import './FormLogin.css'
import { useAppDispatch, useAppSelector } from '../../store'
import { login } from '../../slices/authSlice'
import Loader from '../Loaders/LoaderPage/LoaderPage'

function FormLogin() {

    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const dispatch=useAppDispatch()
    const {loading} = useAppSelector(state => state.auth)

    async function handleSubmit(e : React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        const loginvalues : loginInterface = {
            email,
            password
        }

        await dispatch(login(loginvalues))
    }

  return (
    <>
        {loading && <Loader/>}
        <form onSubmit={handleSubmit} className='loginForm'>
            <label>
                <span>Email:</span>
                <input type='email' placeholder='Digite seu e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type='password' placeholder='Digite sua senha' value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <input type='submit' value='Entrar' />
        </form>
    </>
  )
}

export default FormLogin