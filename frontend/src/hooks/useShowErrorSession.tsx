import { useEffect, useState } from "react"
import { useAppSelector } from "../store"
import errorSession from "../interfaces/errors/errorSession"

function useShowErrorSession() {
    const {error}=useAppSelector(state => state.auth)
    const [errors,setErrors]=useState<errorSession>({})

    function getErrors(){
        if(error === 'user / password invalid'){
            setErrors({errorSession:'E-mail/senha incorretos'})
        }
    }

    useEffect(()=>{
        if(error){
            getErrors()
        }
    },[error])

    return errors
}

export default useShowErrorSession