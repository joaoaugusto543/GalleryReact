import { useState } from 'react'
import './FormRegister.css'
import convertToBase64 from '../../services/convertToBase64'
import {upload} from '../../api/api'
import registerInterface from '../../interfaces/auth/RegisterInterface'
import { useAppDispatch, useAppSelector } from '../../store'
import { createUser } from '../../slices/userSlices'
import { login } from '../../slices/authSlice'
import Loader from '../Loader/Loader'

function FormRegister() {

    const [name,setName]=useState<string>('')
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [confirmPassword,setConfirmPassword]=useState<string>('')
    const [profileImage,setProfileImage]=useState<string | null | unknown>(null)
    const dispatch=useAppDispatch()
    const {loading:loadingAuth}=useAppSelector(state => state.auth)
    const {loading:loadingUser}=useAppSelector(state => state.user)

    async function handleSubmit(e : React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        const register : registerInterface = {
           name,
           email,
           password,
           confirmPassword,
           profile_image:profileImage
        }

        await dispatch(createUser(register))
        await dispatch(login({email,password}))

    }

    async function handleFile(e : React.BaseSyntheticEvent){
        const file : File=e.target.files[0]

        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
            return
        }

        const base64 : string | unknown = await convertToBase64(file)

        setProfileImage(base64)
    }

  return (
    <>
        {loadingAuth && !loadingUser && <Loader/>}
        {!loadingAuth && loadingUser && <Loader/>}
        {profileImage && <img className='imageProfile' src={profileImage} alt={name} />}
        <form onSubmit={handleSubmit} className='registerForm'>
           {!profileImage ?

            <label id='file'>
                <span>Adicione uma foto<br/><p className='optional'>(opcional)</p></span>
                <img src={`${upload}/anonimo.png`} alt='anonymous' />
                <input type='file' accept='image/*' onChange={handleFile} />
            </label>

            :

            <label id='changeImage'>
                <span>Alterar imagem</span>
                <input type='file' accept='image/*' onChange={handleFile} />
            </label>

            }
            <label>
                <span>Name:</span>
                <input type='text' placeholder='Digite seu nome' value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <span>Email:</span>
                <input type='email' placeholder='Digite seu e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type='password' placeholder='Digite sua senha' value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <span>Confirme sua senha:</span>
                <input type='password' placeholder='Repita sua senha' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </label>
            <input type='submit' value='Entrar' />
        </form>
    </>
  )
}

export default FormRegister