import FormLogin from '../../components/FormLogin/FormLogin'
import {Link} from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <section className='loginPage'>
        <div className='boxLogin'>
            <h1>Login</h1>
            <FormLogin/>
            <Link to='/register' >Não possui conta? Cadastre-se</Link>
        </div>
    </section>
  )
}

export default Login