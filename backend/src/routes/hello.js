const {Router} = require('express')

const routes= new Router()

routes.get('/',(req,res)=>{
    res.status(200).json({hello:'hello'})
})

module.exports=routes