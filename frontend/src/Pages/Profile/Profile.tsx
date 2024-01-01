import './Profile.css'
import FormEditUser from '../../components/FormEditUser/FormEditUser'
import useSetTitle from '../../hooks/useSetTitle'

function Profile() {

  useSetTitle({title:'Perfil'})

  return (
    <section className='profile'>
        <h1 className='title'>Editar usuário</h1>
        <FormEditUser/>
    </section>
  )
}

export default Profile