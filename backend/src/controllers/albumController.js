const { insert, select, update, deleteLine } = require('../config/db')
const {v4 : uuid4} = require('uuid')

async function getAlbums(req,res){

    try {

        const {id}=req.user

        const conditionIdUser=`user_id = '${id}'`
    
        const albums=await select('albums','*',conditionIdUser)
    
        return res.status(200).json(albums)

    } catch (error) {

        console.log(error)
        return res.status(500).json({error:'Internal error'})  

    }


}

async function getAlbum(req,res){

    try {

        const {id}=req.params

        const {id:userId}=req.user

        const conditionId=`id = '${id}'`

        const album=(await select('albums','*',conditionId))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }
    
        return res.status(200).json(album)

    } catch (error) {

        console.log(error)
        return res.status(500).json({error:'Internal error'})  

    }


}

async function create(req,res){
    try {

        const {name}=req.body

        const id=uuid4()

        const {id:userId}=req.user

        const date=new Date()

        const options = { timeZone: 'America/Sao_Paulo' }
        const dateBrazil = date.toLocaleString('pt-BR', options)

        const [currentDate,]= dateBrazil.split(',')

        const newAlbum={
            id,
            name,
            date:currentDate,
            user_id:userId
        }

        await insert('albums',newAlbum)

        const conditionId=`id = '${id}'`

        const album=(await select('albums','*',conditionId))[0]

        return res.status(200).json(album)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function updateAlbum(req,res){
    try {

        const {name}=req.body

        const {id}=req.params

        const {id:userId}=req.user

        const conditionId=`id = '${id}'`

        const album=(await select('albums',['user_id'],conditionId))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }
        
        const set=` name = '${name}'`

        await update('albums',set,conditionId)

        const updatedAlbum=(await select('albums',['name'],conditionId))[0]

        return res.status(200).json(updatedAlbum)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function deleteAlbum(req,res){
    try {

        const {id}=req.params
        
        const {id:userId}=req.user

        const conditionId=`id = '${id}'`

        const album=(await select('albums',['user_id','images'],conditionId))[0]

        if(!album){
            return res.status(404).json({error:'Album not found'})
        }

        if(userId !== album.user_id ){
            return res.status(401).json({error:'Not authorized'})
        }

        const deletedAlbum=(await select('albums',['name'],conditionId))[0]

        const conditionIdAlbum = `album_id = '${id}'`
        
        await deleteLine('image',conditionIdAlbum)

        await deleteLine('albums',conditionId)

        return res.status(200).json(deletedAlbum)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const albumController={
    getAlbum,
    getAlbums,
    create,
    updateAlbum,
    deleteAlbum
}

module.exports=albumController