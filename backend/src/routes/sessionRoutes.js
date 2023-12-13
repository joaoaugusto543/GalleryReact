const {Router}=require('express')
const { create } = require('../controllers/sessionControllers')

const routes=new Router()

routes.post('/',create)

module.exports=routes