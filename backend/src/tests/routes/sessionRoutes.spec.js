const { insert, deleteLine } = require('../../config/db')
const app = require('../../app')
const request=require('supertest')
const { encryptPassword } = require('../../services/cryptography')

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

describe('SessionsRoutes',()=>{
    
    it('Create session',async ()=>{
        
        const {id,email}=await createUser('gjdscudcsuh','uysayguvsd@gmail.com')
       
        const res=await request(app).post('/api/session/').send({email,password:'1234567'})

        const conditionId=`id = '${id}'`

        deleteLine('users',conditionId)

        const body=res.body

        expect(body).toHaveProperty('user')
        expect(body).toHaveProperty('token')
      
    })

    it('Error user / password invalid create session',async ()=>{
       
        const res=await request(app).post('/api/session/').send({email:'looopes@gmail.com',password:'123456'})

        const body=res.body

        expect(body).toHaveProperty('authenticationError')
        expect(body.authenticationError).toBe('user / password invalid')
      
    })
})