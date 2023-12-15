const request = require('supertest')
const app = require('../../app')
const { select, insert, deleteLine } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')

const baseUrl='/api/users'

async function createUser(id,email){
    const newUser={
        id,
        name:'test',
        email,
        password:await encryptPassword('1234567')
    }

    await insert('users',newUser)

    return newUser
}

async function login(email,password){

    const res=await request(app).post('/api/session').send({email,password})

    const {token}=res.body

    return `Bearer ${token}`
}

async function deleteUser(id){
    await deleteLine('users',`id = '${id}'`)
}

describe('UserValidation',()=>{

    it('CreateUserValidation',async ()=>{

        const newUser={
            name:'l',
            email:'lo',
            password:'123',
            confirmPassword:'14567'
        }

        const res=await request(app).post(`${baseUrl}/`).send(newUser)

        const body=res.body

        expect(body).toHaveProperty('errors')
    })

    it('UpdateUserValidation',async ()=>{

        const {id,email}=await createUser('d72vxbbfdsg32t3433','texxxxst@gmail.com')

        const updates={
            name:'l'
        }

        const token=await login(email,'1234567')

        const res=await request(app).put(`${baseUrl}/`).send(updates).set('Authorization',token)

        const body=res.body

        await deleteUser(id)

        expect(body).toHaveProperty('errors')
    })
    
})