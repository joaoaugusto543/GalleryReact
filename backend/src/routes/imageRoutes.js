const {Router}=require('express')
const auth = require('../middlewares/auth')
const { createImage, updateImage, deleteImage, getImages, getImage } = require('../controllers/imageControllers')
const { createImageValidation, updateImageValidation } = require('../middlewares/imageValidation')
const handleValidation = require('../middlewares/handleValidation')
const routes=new Router()

routes.post('/:id',auth,createImageValidation(),handleValidation,createImage)
routes.get('/:id',auth,getImages)
routes.get('/:album_id/:id',auth,getImage)
routes.put('/:album_id/:id',auth,updateImageValidation(),handleValidation,updateImage)
routes.delete('/:album_id/:id',auth,deleteImage)

module.exports=routes