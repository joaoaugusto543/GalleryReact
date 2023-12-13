const { select, insert, update, deleteLine } = require('../config/db')
const { v4 : uuid4 } = require('uuid')

async function createImage(req,res){
    try {

        const {id:album_id}=req.params

        const {id:userId}=req.user

        const conditionIdAlbum=` id = '${album_id}'`

        const album=(await select('albums','*',conditionIdAlbum))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const {name,description,image:imageReq}=req.body

        const id=uuid4()

        const date=new Date()

        const options = { timeZone: 'America/Sao_Paulo' }
        const dateBrazil = date.toLocaleString('pt-BR', options)

        const [currentDate,]= dateBrazil.split(',')

        const newImage={
            id,
            image:imageReq,
            date:currentDate,
            album_id
        }

        if(name){
            newImage.name=name
        }

        if(description){
            newImage.description=description
        }

        await insert('image',newImage)

        const albumImages=album.images.map(image => `'${image}'`)

        albumImages.push(`'${id}'`)

        const set=` images = array [${albumImages}]`

        await update('albums',set,conditionIdAlbum)

        const conditionId=`id = '${id}'`

        const image=(await select('image','*',conditionId))[0]

        return res.status(200).json(image)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function updateImage(req,res){
    try {

        const {id,album_id}=req.params

        const {id:userId}=req.user

        const conditionIdAlbum=` id = '${album_id}'`

        const album=(await select('albums','*',conditionIdAlbum))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const conditionId=`id = '${id}'`

        const image=(await select('image',['id','album_id'],conditionId))[0]

        if(!image){
            return res.status(404).json({error:'Image not found'})
        }

        if(image.album_id !== album.id){
            return res.status(401).json({error:'Not authorized'})
        }

        const {name,description}=req.body
        
        let set=''

        if(name && description){
            set=` name = '${name}' , description = '${description}'`
        }

        if(!name && description){
            set=` name = null , description = '${description}'`
        }

        if(name && !description){
            set=` name = '${name}' , description = null`
        }

        if(!name && !description){
            set=` name = null , description = null`
        }

        await update('image',set,conditionId)

        const updatedImage=(await select('image','*',conditionId))[0]

        return res.status(200).json(updatedImage)
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function deleteImage(req,res){
    try {

        const {id,album_id}=req.params

        const {id:userId}=req.user

        const conditionIdAlbum=` id = '${album_id}'`

        const album=(await select('albums','*',conditionIdAlbum))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const conditionId=`id = '${id}'`

        const image=(await select('image',['id','album_id'],conditionId))[0]

        if(!image){
            return res.status(404).json({error:'Image not found'})
        }

        if(image.album_id !== album.id){
            return res.status(404).json({error:'Not authorized'})
        }

        album.images=album.images.filter(image => image !== id)

        const albumImages=album.images.map(image => `'${image}'`)

        let set=''

        if(albumImages.length === 0){
            set=` images = '{}'`
        }else{
            set=` images = array [${albumImages}]`
        }

        await update('albums',set,conditionIdAlbum)

        await deleteLine('image',conditionId)

        return res.status(200).json(image)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function getImages(req,res){
    try {

        const {id:album_id}=req.params

        const {id:userId}=req.user

        const conditionId=` id = '${album_id}'`

        const album=(await select('albums','*',conditionId))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const conditionIdAlbum=`album_id = '${album_id}'`

        const images=await select('image','*',conditionIdAlbum)

        return res.status(200).json(images)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function getImage(req,res){
    try {

        const {id,album_id}=req.params

        const {id:userId}=req.user

        const conditionIdAlbum=` id = '${album_id}'`

        const album=(await select('albums','*',conditionIdAlbum))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const conditionId=`id = '${id}'`

        const image=(await select('image','*',conditionId))[0]

        if(!image){
            return res.status(404).json({error:'Image not found'})
        }

        if(image.album_id !== album.id){
            return res.status(404).json({error:'Not authorized'})
        }

        return res.status(200).json(image)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const imageControllers={
    createImage,
    updateImage,
    deleteImage,
    getImages,
    getImage
}

module.exports=imageControllers