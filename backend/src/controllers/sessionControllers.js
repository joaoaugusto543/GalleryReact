const { select } = require('../config/db')
const { verifyPassword } = require('../services/cryptography')
const jwt = require('jsonwebtoken')

async function create(req,res){

    const {email,password}=req.body

    const conditionEmail=`email = '${email}'`

    const user=(await select('users','*',conditionEmail))[0]

    if(!user){
        return res.status(404).json({authenticationError:'user / password invalid'})
    }

    if(!await verifyPassword(user,password)){
        return res.status(404).json({authenticationError:'user / password invalid'})
    }

    const {id,name,profile_image}=user

    const secret= process.env.TOKEN_SECRET

    return res.status(200).json({
        user:{
            id,
            name,
            profile_image
        },
        token: jwt.sign({id},secret,{expiresIn:'7d'})
    })
}

const sessionControllers={
    create
}

module.exports=sessionControllers