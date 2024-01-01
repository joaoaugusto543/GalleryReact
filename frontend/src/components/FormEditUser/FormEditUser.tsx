import './FormEditUser.css'
import useGetUser from '../../hooks/useGetUser'
import { useAppDispatch, useAppSelector } from '../../store'
import { useEffect, useState } from 'react'
import convertToBase64 from '../../services/convertToBase64'
import { resetSuccess, updateUser } from '../../slices/userSlices'
import LoaderPage from '../Loaders/LoaderPage/LoaderPage'
import useShowErrorsUsers from '../../hooks/useShowErrorsUsers'

function FormEditUser() {

  useGetUser()
  const {user,loading}=useAppSelector(state => state.user)
  const [showFormEditPassword,setShowFormEditPassword]=useState<boolean>(false)
  const [name,setName]=useState<string>('')
  const [profileImage,setProfileImage]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [newPassword,setNewPassword]=useState<string>('')
  const [confirmNewPassword,setConfirmNewPassword]=useState<string>('')
  const dispatch=useAppDispatch()
  const {token}=useAppSelector(state => state.auth)
  const {errorConfirmPassword,errorName,errorProfileImage,authenticationError,errorNewPassword}=useShowErrorsUsers()

  useEffect(()=>{
    if(user){
        setName(user.name)
        setProfileImage(user.profile_image)
    }
  },[user])
  
  function handleCloseEditPassword(e:React.BaseSyntheticEvent){
    e.preventDefault()
    setShowFormEditPassword(false)
  }

  function handleOpenEditPassword(e:React.BaseSyntheticEvent){
    e.preventDefault()
    setShowFormEditPassword(true)
  }

  function handleSubmit(e:React.BaseSyntheticEvent){
    e.preventDefault()

    interface userUpdated{
        name?:string,
        newPassword?:string,
        confirmPassword?:string,
        password?:string,
        profile_image?:string
    }

    const data:userUpdated={}

    if(name !== user?.name){
        data.name=name
    }

    if(profileImage !== user?.profile_image){
        data.profile_image=profileImage
    }

    if(password){
        data.password=password
    }

    if(newPassword){
        data.newPassword=newPassword
    }

    if(confirmNewPassword){
        data.confirmPassword=confirmNewPassword
    }

    if(token){
        dispatch(resetSuccess())
        dispatch(updateUser({userUpdated:data,token}))
        setConfirmNewPassword('')
        setPassword('')
        setNewPassword('')
    }
  }

  async function handleFile(e : React.BaseSyntheticEvent){
        const file : File=e.target.files[0]

        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
            return
        }

        const base64 : string | unknown = await convertToBase64(file)

        if(typeof(base64) === 'string'){
            setProfileImage(base64)
        }

   }

  return (
    <div className='formEditUser'>
        {!user && <LoaderPage/>}
        {user &&
            <>
                <img src={profileImage} alt={user.name} />
                <form>
                    <label id='fileEditUser'>
                        {user && profileImage.indexOf('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJQAlAAD//') !== -1 ?
                            <span>Adicionar foto</span>
                            :
                            <span>Editar foto</span>
                        }
                        <input type='file' accept='image/*' onChange={handleFile} />
                        {errorProfileImage && <p className='error'>{errorProfileImage}</p>}
                    </label>
                    <label>
                        <span>Nome:</span>
                        <input type='text' value={name} placeholder='Digite seu nome' onChange={e =>setName(e.target.value)}/>
                        {errorName && <p className='error'>{errorName}</p>}
                    </label>
                    <label className='labelEmail'>
                        <span>E-mail:</span>
                        <input type='text' value={user?.email} disabled/>
                    </label>
                    {showFormEditPassword &&
                        <>
                            <label>
                                <span>Senha:</span>
                                <input type='password' value={password} placeholder='Digite sua senha' onChange={e =>setPassword(e.target.value)}/>
                                {authenticationError && <p className='error'>{authenticationError}</p>}
                            </label>
                            <label>
                                <span>Nova senha:</span>
                                <input type='password' value={newPassword} placeholder='Digite sua nova senha' onChange={e =>setNewPassword(e.target.value)}/>
                                {errorNewPassword && <p className='error'>{errorNewPassword}</p>}
                            </label>
                            <label>
                                <span>Confirmar nova senha:</span>
                                <input type='password' value={confirmNewPassword} placeholder='confirme sua nova senha' onChange={e =>setConfirmNewPassword(e.target.value)}/>
                                {errorConfirmPassword && <p className='error'>{errorConfirmPassword}</p>}
                            </label>
                        </>
                    }

                    {showFormEditPassword ? <button className='editPassword' onClick={handleCloseEditPassword}>Fechar</button> : <button className='editPassword' onClick={handleOpenEditPassword}>Editar senha</button>}
                    {!loading ? <input type='submit' value='Editar' onClick={handleSubmit} /> : <input type='submit' value='Aguarde...' onClick={()=>{}} disabled />}
                </form>
            </> 
        }
    </div>
  )
}

export default FormEditUser