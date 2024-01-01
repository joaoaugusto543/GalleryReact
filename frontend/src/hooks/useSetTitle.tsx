import { useEffect } from 'react'

type Props={
    title:string
}

function useSetTitle({title}:Props) {
  useEffect(()=>{
    document.title=title
  },[])
}

export default useSetTitle