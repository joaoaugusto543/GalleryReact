const {Router}=require('express')
const { createUser, updateUser, profile } = require('../controllers/userControllers')
const auth = require('../middlewares/auth')
const { createUserValidation, updateUserValidation } = require('../middlewares/userValidation')
const handleValidation = require('../middlewares/handleValidation')

const routes=new Router()

routes.post('/',createUserValidation(),handleValidation,createUser)
routes.put('/',auth,updateUserValidation(),handleValidation,updateUser)
routes.get('/',auth,profile)

module.exports=routes