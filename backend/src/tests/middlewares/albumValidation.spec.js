const request = require('supertest')
const app = require('../../app')
const { insert, deleteLine } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')

const baseUrl='/api/albums'

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

describe('AlbumValidation',()=>{

    it('albumValidation',async ()=>{

        const user=await createUser('dhgbecdfdssdfsasg738762gte','thewfsdfdsvbdexfsaubcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const newAlbum={
            name:'a'
        }
    
        const res=await request(app).post(`${baseUrl}/`).send(newAlbum).set('Authorization',token)
    
        const body=res.body
    
        await deleteUser(user.id)

        expect(body).toHaveProperty('errors')
    })
    
})