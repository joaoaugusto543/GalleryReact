import { useEffect, useState } from 'react'
import { useAppSelector } from '../store'
import errorAlbum from '../interfaces/errors/errorAlbum'

function useShowErrorsAlbum() {

   const {error}=useAppSelector(state => state.albums)
   const [errors,setErrors]=useState<errorAlbum>({})

   function getErrors(){
       if(!Array.isArray(error)){
         return
       }
    
       if(error.includes('Name is required') || error.includes('Name too big or small')){
        setErrors({errorName:'Nome muito pequeno/grande'})
       }

   }

   useEffect(()=>{
    if(error){
        getErrors()
    }
   },[error])
   

   return errors
   
}

export default useShowErrorsAlbum