import { useEffect, useState } from 'react'
import { useAppSelector } from '../store'
import errorUser from '../interfaces/errors/errorUser'

function useShowErrorsUsers() {

    const [error,setError]=useState<errorUser>({})

    const {errors,success}=useAppSelector(state => state.user)

    function getErrors(){

        if(errors === 'Authentication error'){
            setError({...error,authenticationError:errors})
        }

        if(!Array.isArray(errors)){
            return 
        }

        const extractErrors:errorUser={}

        if(errors.includes('Name is required') || errors.includes('Name too big or small')){
            extractErrors.errorName='Nome muito pequeno/grande'
        }

        if(errors.includes('Email is required') || errors.includes('Invalid email')){
            extractErrors.errorEmail='E-mail inválido'
        }

        if(errors.includes('Password is required') || errors.includes('Password too small')){
            extractErrors.errorPassword='Senha muito pequena'
        }

        if(errors.includes('NewPassword too small') || errors.includes('NewPassword too small')){
            extractErrors.errorNewPassword='Senha muito pequena'
        }

        if(errors.includes('Passwords need to be the same')){
            extractErrors.errorConfirmPassword='As senhas precisam ser iguais'
        }

        if(errors.includes('Image is required') || errors.includes('Invalid image')){
            extractErrors.errorProfileImage='Imagem inválida'
        }

        setError(extractErrors)
    }

    useEffect(()=>{
        if(errors){
            getErrors()
        }
    },[errors])

    useEffect(()=>{
        if(success){
            setError({})
        }
    },[success])

    return error
  
}

export default useShowErrorsUsers