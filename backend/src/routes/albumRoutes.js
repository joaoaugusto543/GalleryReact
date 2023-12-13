const {Router}=require('express')
const { create, updateAlbum, deleteAlbum, getAlbums, getAlbum } = require('../controllers/albumController')
const auth = require('../middlewares/auth')
const albumValidation = require('../middlewares/albumValidation')
const handleValidation = require('../middlewares/handleValidation')

const routes=new Router()

routes.get('/',auth,getAlbums)
routes.get('/:id',auth,getAlbum)
routes.post('/',auth,albumValidation(),handleValidation,create)
routes.put('/:id',auth,albumValidation(),handleValidation,updateAlbum)
routes.delete('/:id',auth,deleteAlbum)

module.exports=routes