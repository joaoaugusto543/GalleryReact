const {promisify}=require('util')
const jwt=require('jsonwebtoken')
const { select } = require('../config/db')

async function auth(req,res,next){

    const authHeader=req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:'Token was not provided'})
    }

    const [,token]=authHeader.split(' ')

    try {

        const secret=process.env.TOKEN_SECRET

        const decoded=await promisify(jwt.verify)(token,secret)

        const conditionId=`id = '${decoded.id}'`

        const user=(await select('users',['id','name','email','profile_image'],conditionId))[0]

        req.user=user

        next()
        
    } catch (error) {
        return res.status(401).json('Invalid token')
    }
}

module.exports=auth