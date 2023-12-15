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

describe('imageRoutes',()=>{
    it('CreateImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('udsy631gqd','byuxcgbysdavtr@gmail.com')

        const image = await createImage(album.id,token)

        const conditionIdImage = `id = '${image.id}'`

        const imageDb=(await select('image',['name'],conditionIdImage))[0]

        const conditionIdAlbum = `id = '${album.id}'`

        const albumDb=(await select('albums',['images'],conditionIdAlbum))[0]

        await deleteImage(image.id)
        await deleteData(user.id,album.id)

        expect(imageDb.name).toBe(image.name)
        expect(albumDb[0]).toBe(imageDb.id)

    })

    it('Album not found / createImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fggfggre','byuxccvcxgbysdavtr@gmail.com')

        const {error} = await createImage('djnssdf',token)

        await deleteData(user.id,album.id)

        expect(error).toBe('Album not found')

    })

    it('Not authorized / createImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('fgddsafgfggre','byuxcwaqcdcvcxgbysdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fggftewdeggre','byuvewcxgbysdavtr@gmail.com')

        const {error} = await createImage(albumOne.id,tokenTwo)

        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('UpdateImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('udsdsfdf31gqd','bysdgfsdvsdavtr@gmail.com')

        const image = await createImage(album.id,token)

        const conditionIdImage = `id = '${image.id}'`

        const updates={
            name:'lopes'
        }

        await request(app).put(`${baseUrl}/${album.id}/${image.id}`).send(updates).set('Authorization',token)

        const imageDb=(await select('image',['name'],conditionIdImage))[0]

        await deleteImage(image.id)
        await deleteData(user.id,album.id)

        expect(imageDb.name).not.toBe(image.name)
        expect(imageDb.name).toBe('lopes')

    })

    it('Album not found / updateImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fsddfgfasgre','byufdfgdxccavcasdsdavtr@gmail.com')

        const updates={
            name:'lopes'
        }

        const res=await request(app).put(`${baseUrl}/nckdnsd/ndjidns`).send(updates).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Album not found')

    })

    it('Not authorized / updateImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('fgafsczbfggre','byuxdnjsdcxgbysdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fggfhdfgdsjare','byuwefvlfdhfsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const updates={
            name:'lopes'
        }

        const res=await request(app).put(`${baseUrl}/${albumOne.id}/${image.id}`).send(updates).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('Image not found / updateImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fssfdassgre','byufdfgcdcasdsdavtr@gmail.com')

        const updates={
            name:'lopes'
        }

        const res=await request(app).put(`${baseUrl}/${album.id}/ndjidns`).send(updates).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Image not found')

    })

    it('Not authorized / updateImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('fgafsgaddssczbfggre','byuxsdednjsdcxgbysdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fggfsdaghdfgdsjare','byuwegdvxrfvlfdhfsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const updates={
            name:'lopes'
        }

        const res=await request(app).put(`${baseUrl}/${albumTwo.id}/${image.id}`).send(updates).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })
    
    it('DeleteImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('udsddsfdsfsfdf31gqd','bybdssesdgfsdvsdavtr@gmail.com')

        const image = await createImage(album.id,token)

        const conditionIdImage = `id = '${image.id}'`

        await request(app).delete(`${baseUrl}/${album.id}/${image.id}`).set('Authorization',token)

        const imageDb=(await select('image',['name'],conditionIdImage))[0]

        await deleteData(user.id,album.id)

        expect(imageDb).toBeUndefined()

    })

    it('Album not found / deleteImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fsddaree','sdfdxccavcasdsdavtr@gmail.com')

        const res=await request(app).delete(`${baseUrl}/nckdnsd/ndjidns`).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Album not found')

    })

    it('Not authorized / deleteImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('svfggre','bysdafsdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fasfdvsgdsjare','basfddhfsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const res=await request(app).delete(`${baseUrl}/${albumOne.id}/${image.id}`).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('Image not found / deleteImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fsvkadfre','byuffyyhxdsdavtr@gmail.com')

        const res=await request(app).delete(`${baseUrl}/${album.id}/ndjidns`).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Image not found')

    })

    it('Not authorized / deleteImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('zxfdfsdcsd','bydsfgbysdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fgndnjare','byumgdhsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const res=await request(app).delete(`${baseUrl}/${albumTwo.id}/${image.id}`).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('GetImages',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('udsdssxxdfdfdxdf31gqd','bysxddfsxgrewqgfsdvsdavtr@gmail.com')

        const image = await createImage(album.id,token)

        const res=await request(app).get(`${baseUrl}/${album.id}`).set('Authorization',token)

        const images=res.body

        await deleteImage(image.id)
        await deleteData(user.id,album.id)

        expect(Array.isArray(images)).toBeTruthy()
        expect(images[0].id).toBe(image.id)

    })

    it('Album not found / getImages',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('ljxdued','lsdnjsdxsdsdavtr@gmail.com')

        const res=await request(app).get(`${baseUrl}/nckdnsd`).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Album not found')

    })

    it('Not authorized / getImages',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('fgndxxhdbeggre','dvsxgbysdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('trxewdsjare','bdcfvlfdhfsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const res=await request(app).get(`${baseUrl}/${albumOne.id}`).set('Authorization',tokenTwo)
      
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('GetImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('dgfshwxhdf31gqd','idrsfgxsdftr@gmail.com')

        const image = await createImage(album.id,token)

        const res=await request(app).get(`${baseUrl}/${album.id}/${image.id}`).set('Authorization',token)

        const imageBody=res.body

        await deleteImage(image.id)
        await deleteData(user.id,album.id)

        expect(imageBody.id).toBe(image.id)

    })

    it('Album not found / getImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('fqxse','adfwdfxfdssdavtr@gmail.com')

        const res=await request(app).get(`${baseUrl}/nckdnsd/ndjidns`).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Album not found')

    })

    it('Not authorized / getImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('rgexgfedgfte','yewyfsdavtr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('fwedxsdsdfe','ifhhfsdavtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const res=await request(app).get(`${baseUrl}/${albumOne.id}/${image.id}`).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })

    it('Image not found / getImage',async ()=>{

        const {newUser:user,album,bearerToken:token}=await initialData('jfxdffgd','fdgfdgxdstr@gmail.com')

        const res=await request(app).get(`${baseUrl}/${album.id}/ndjidns`).set('Authorization',token)

        const {error}=res.body

        await deleteData(user.id,album.id)

        expect(error).toBe('Image not found')

    })

    it('Not authorized / getImage',async ()=>{

        const {newUser:userOne,album:albumOne,bearerToken:tokenOne}=await initialData('mgdfhgf','xsddfdffdr@gmail.com')
        const {newUser:userTwo,album:albumTwo,bearerToken:tokenTwo}=await initialData('ndgrfe','vefrvfdgvtr@gmail.com')

        const image = await createImage(albumOne.id,tokenOne)

        const res=await request(app).get(`${baseUrl}/${albumTwo.id}/${image.id}`).set('Authorization',tokenTwo)
        
        const {error}=res.body

        await deleteImage(image.id)
        await deleteData(userOne.id,albumOne.id)
        await deleteData(userTwo.id,albumTwo.id)

        expect(error).toBe('Not authorized')

    })
})
