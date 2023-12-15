const request = require('supertest')
const { select, insert, deleteLine } = require('../../config/db')
const { encryptPassword } = require('../../services/cryptography')
const app = require('../../app')

const baseUrl='/api/images'

const base64= require('../../data/imageBase64')

async function initialData(id,email){
    const newUser={
        id,
        name:'test',
        email,
        password:await encryptPassword('1234567')
    }
    
    await insert('users',newUser)

    const resSession=await request(app).post('/api/session').send({email,password:'1234567'})

    const {token}=resSession.body

    const bearerToken = `Bearer ${token}`

    const newAlbum={
        name:'album'
    }

    const resAlbum=await request(app).post(`/api/albums`).send(newAlbum).set('Authorization',bearerToken)

    const album=resAlbum.body

    return {newUser,album,bearerToken}
}

async function deleteData(idUser,idAlbum){
    await deleteLine('albums',`id = '${idAlbum}'`)
    await deleteLine('users',`id = '${idUser}'`)

}

async function deleteImage(id){
    await deleteLine('image',`id = '${id}'`)
}

async function createImage(albumId,token){
    const newImage={
        name:'NextCoffee',
        image:base64
    }

    const res=await request(app).post(`${baseUrl}/${albumId}`).set('Authorization',token).send(newImage)

    const image=res.body

    return image

}

describe('ImageValidation.spec',()=>{

    it('CreateImageValidation',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fef1gqd','tuytjxsdavtr@gmail.com')

        const newImage={}
    
        const res=await request(app).post(`${baseUrl}/${album.id}`).set('Authorization',token).send(newImage)
    
        const body=res.body

        await deleteData(user.id,album.id)

        expect(body).toHaveProperty('errors')

    })

    it('UpdateImageValidation',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('cvfnbcxed','xdssdvsfgrsxr@gmail.com')

        const image = await createImage(album.id,token)

        const updates={
            name:'llllllllllllllllllllllllllllllllllllllllllll'
        }

        const res=await request(app).put(`${baseUrl}/${album.id}/${image.id}`).send(updates).set('Authorization',token)

        const body=res.body

        await deleteImage(image.id)
        await deleteData(user.id,album.id)

        expect(body).toHaveProperty('errors')

    })
})
