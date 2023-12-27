import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { resetError } from '../slices/imagesSlice'


function UseValidatePageImage() {

    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const {error}=useAppSelector(state => state.images)

    useEffect(()=>{

        if(error==='Image not found' || error==='Album not found'){
            navigate('/')
            dispatch(resetError())  
        }

    },[error])

}

export default UseValidatePageImage