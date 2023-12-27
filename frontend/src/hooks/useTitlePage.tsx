import { useEffect } from 'react'
import { useAppSelector } from '../store'

function useTitlePage() {
  const {album}=useAppSelector(state => state.albums)

  useEffect(()=>{
    if(album){
      document.title=album.name
    }
  },[album])
  
}

export default useTitlePage