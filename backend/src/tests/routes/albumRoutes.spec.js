const request = require('supertest')
const app = require('../../app')
const { select, insert, deleteLine } = require('../../config/db')
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

async function createAlbum(token){

    const newAlbum={
        name:'album'
    }

    const res=await request(app).post(`${baseUrl}/`).send(newAlbum).set('Authorization',token)

    const album=res.body

    return album

}

async function login(email,password){

    const res=await request(app).post('/api/session').send({email,password})

    const {token}=res.body

    return `Bearer ${token}`
}

async function deleteUser(id){
    await deleteLine('users',`id = '${id}'`)
}

async function deleteAlbum(id){
    await deleteLine('albums',`id = '${id}'`)
}

describe('albumRoutes',()=>{
    it('CreateAlbum',async ()=>{

        const user=await createUser('dhgbecdsasg738762gte','thewffsaubcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const {id,name}=await createAlbum(token)

        const conditionId=`id = '${id}'`

        const album=(await select('albums',['name'],conditionId))[0]

        await deleteAlbum(id)

        await deleteUser(user.id)

        expect(album.name).toBe(name)
    })

    it('UpdateAlbum',async ()=>{

        const user=await createUser('dhgbeqwr738762gte','thdfsdfsubcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const {id,name}=await createAlbum(token)

        const updates={
            name:'mudei'
        }

        const conditionId=`id = '${id}'`

        await request(app).put(`${baseUrl}/${id}`).send(updates).set('Authorization',token)

        const album=(await select('albums',['name'],conditionId))[0]

        await deleteAlbum(id)

        await deleteUser(user.id)

        expect(album.name).not.toBe(name)
        expect(album.name).toBe('mudei')
    })

    it('Album not found / updateAlbum',async ()=>{

        const user=await createUser('dhgbe738dsfsd762gte','thufbcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const updates={
            name:'mudei'
        }

        const res=await request(app).put(`${baseUrl}/9236`).send(updates).set('Authorization',token)

        await deleteUser(user.id)

        const {error}=res.body

        expect(error).toBe('Album not found')
    })

    it('Not authorized / updateAlbum',async ()=>{

        const userOne=await createUser('dhgbeqwr73QAS8762gte','thdfsdfbfgefsubcdst@gmail.com')

        const tokenOne=await login(userOne.email,'1234567')

        const userTwo=await createUser('dhgbfdbeqwr738762gte','thdfsdfvdssubcdst@gmail.com')

        const tokenTwo=await login(userTwo.email,'1234567')

        const {id}=await createAlbum(tokenOne)

        const updates={
            name:'mudei'
        }

        const res=await request(app).put(`${baseUrl}/${id}`).send(updates).set('Authorization',tokenTwo)

        const {error}=res.body

        await deleteAlbum(id)

        await deleteUser(userOne.id)

        await deleteUser(userTwo.id)

        expect(error).toBe('Not authorized')
    })

    it('DeleteAlbum',async ()=>{

        const user=await createUser('dhgbeqsdsfdavfsdwr738762gte','thdfnsdusdfsubcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const {id}=await createAlbum(token)

        const conditionId=`id = '${id}'`

        await request(app).delete(`${baseUrl}/${id}`).set('Authorization',token)

        const album=(await select('albums',['name'],conditionId))[0]

        await deleteUser(user.id)

        expect(album).toBeUndefined()
    })

    it('Album not found / deleteAlbum',async ()=>{

        const user=await createUser('dhgbe738ddsfdsfsd762gte','thugerweafbcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const res=await request(app).delete(`${baseUrl}/9236`).set('Authorization',token)

        await deleteUser(user.id)

        const {error}=res.body

        expect(error).toBe('Album not found')
    })

    it('Not authorized / deleteAlbum',async ()=>{

        const userOne=await createUser('dhsddsfgbeqwr73QAS8762gte','thdfsdfbfgefsubcdst@gmail.com')

        const tokenOne=await login(userOne.email,'1234567')

        const userTwo=await createUser('dhgbfdbeeewfwdqwr738762gte','thdfsdfvdssubcdst@gmail.com')

        const tokenTwo=await login(userTwo.email,'1234567')

        const {id}=await createAlbum(tokenOne)

        const res=await request(app).delete(`${baseUrl}/${id}`).set('Authorization',tokenTwo)

        const {error}=res.body

        await deleteAlbum(id)

        await deleteUser(userOne.id)

        await deleteUser(userTwo.id)

        expect(error).toBe('Not authorized')
    })

    it('GetAlbums',async ()=>{

        const user=await createUser('afndf32sda','dsfsaufaw@gmail.com')

        const token=await login(user.email,'1234567')

        const {id}=await createAlbum(token)

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        const albums=res.body

        await deleteAlbum(id)

        await deleteUser(user.id)

        expect(Array.isArray(albums)).toBeTruthy()
        expect(albums).toHaveLength(1)
    })

    it('GetAlbum',async ()=>{

        const user=await createUser('afndfvfdf32sda','dsfsasaufaw@gmail.com')

        const token=await login(user.email,'1234567')

        const {id,name}=await createAlbum(token)

        const res=await request(app).get(`${baseUrl}/${id}`).set('Authorization',token)

        const album=res.body

        await deleteAlbum(id)

        await deleteUser(user.id)

        expect(album.name).toBe(name)
        
    })

    it('Album not found / getAlbum',async ()=>{

        const user=await createUser('dhgbe738ssdfsddsfdsfsd762gte','tsdfdsugerweafbcdst@gmail.com')

        const token=await login(user.email,'1234567')

        const res=await request(app).get(`${baseUrl}/9236`).set('Authorization',token)

        await deleteUser(user.id)

        const {error}=res.body

        expect(error).toBe('Album not found')
    })

    it('Not authorized / getAlbum',async ()=>{

        const userOne=await createUser('dhssdf3QAS8762gte','thdfsbetrfsubcdst@gmail.com')

        const tokenOne=await login(userOne.email,'1234567')

        const userTwo=await createUser('dhdh4rr2degte','thdfdsfgffkssubcdst@gmail.com')

        const tokenTwo=await login(userTwo.email,'1234567')

        const {id}=await createAlbum(tokenOne)

        const res=await request(app).get(`${baseUrl}/${id}`).set('Authorization',tokenTwo)

        const {error}=res.body

        await deleteAlbum(id)

        await deleteUser(userOne.id)

        await deleteUser(userTwo.id)

        expect(error).toBe('Not authorized')
    })
})