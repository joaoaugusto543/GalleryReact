import './Warning.css'

type Props = {
    text:string,
    action:Function,
    setShowWarning:Function
}

function Warning({text,action,setShowWarning}: Props) {
  return (
    <div className='warning'>
        <div className='warningBox'>
            <h1>{text}</h1>
            <div className='buttonsWarning'>
                <button onClick={() => action()}>Sim</button>
                <button onClick={() => setShowWarning()}>Não</button>
            </div>
        </div>
    </div>
  )
}

export default Warning