import FormRegister from '../../components/FormRegister/FormRegister'
import {Link} from 'react-router-dom'
import './Register.css'
import useSetTitle from '../../hooks/useSetTitle'

function Register() {

  useSetTitle({title:'Cadastro'})

  return (
    <section className='registerPage'>
        <div className='boxRegister'>
            <h1>Cadastro</h1>
            <FormRegister/>
            <Link to='/login' >Já possui conta? conecte-se</Link>
        </div>
    </section>
  )
}

export default Register