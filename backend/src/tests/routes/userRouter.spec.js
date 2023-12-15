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

describe('userRoutes',()=>{
    it('CreateUser',async ()=>{
        const newUser={
            name:'lopes',
            email:'lopes@gmail.com',
            password:'1234567',
            confirmPassword:'1234567'
        }

        await request(app).post(`${baseUrl}/`).send(newUser)

        const conditionEmail=`email = '${newUser.email}'`

        const user=(await select('users',['id','email','name'],conditionEmail))[0]

        await deleteUser(user.id)

        expect(user.email).toBe(newUser.email)
        expect(user.name).toBe(newUser.name)
    })

    it('User already exists / createUser',async ()=>{
        const newUser={
            name:'lopes',
            email:'lopes@gmail.com',
            password:'1234567',
            confirmPassword:'1234567'
        }

        await request(app).post(`${baseUrl}/`).send(newUser)
        const res=await request(app).post(`${baseUrl}/`).send(newUser)

        const conditionEmail=`email = '${newUser.email}'`

        await deleteLine('users',conditionEmail)

        const {error}=res.body

        expect(error).toBe('User already exists')
    })

    it('UpdateUser',async ()=>{

        const {id,name,email}=await createUser('d72g32t3433','test@gmail.com')

        const updates={
            name:'lopes'
        }

        const token=await login(email,'1234567')

        await request(app).put(`${baseUrl}/`).send(updates).set('Authorization',token)

        const conditionId=`id = '${id}'`
       
        const user= (await select('users',['name'],conditionId))[0]

        await deleteUser(id)

        expect(user.name).not.toBe(name)
        expect(user.name).toBe('lopes')
    })
    
    it('No changes / updateUser',async ()=>{

        const {id,email}=await createUser('efbdsfs74','tedestbds@gmail.com')

        const updates={}

        const token=await login(email,'1234567')

        const res=await request(app).put(`${baseUrl}/`).send(updates).set('Authorization',token)

        const {message}=res.body

        await deleteUser(id)

        expect(message).toBe('No changes')
    })

    it('Profile',async ()=>{

        const {id,email}=await createUser('efbsdfsddsfs74','tedefgdstbds@gmail.com')

        const token=await login(email,'1234567')

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        const user=res.body

        await deleteUser(id)

        expect(user.email).toBe(email)
    })
})