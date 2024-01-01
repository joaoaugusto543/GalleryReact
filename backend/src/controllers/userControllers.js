const { v4: uuidv4 } = require('uuid')
const { insert, select, update } = require('../config/db')
const { encryptPassword, verifyPassword } = require('../services/cryptography')

async function createUser(req,res){
    try {

        const {name,email,password,profile_image}=req.body

        const conditionEmail=`email = '${email}'`

        const oldUser=(await select('users',['id'],conditionEmail))[0]

        if(oldUser){
            return res.status(500).json({error:'User already exists'})
        }

        const id=uuidv4()

        const encryptedPassword=await encryptPassword(password)

        const newUser={id,name,email,password:encryptedPassword}

        if(profile_image){
            newUser.profile_image=profile_image
        }

        await insert('users',newUser)

        const conditionId=`id = '${id}'`

        const user=await select('users',['id','name','email','profile_image'],conditionId)

        return res.status(200).json(user)
     
    } catch (error) {

        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function updateUser(req,res){
    try {

        const {name,newPassword,profile_image,password}=req.body

        const userReq=req.user

        const {id}=userReq

        if(!userReq){
            return res.status(404).json({error:'User not found'})
        }

        let setArray=[]
        let set=''
        
        if(name){
            setArray.push({name})
        }
        
        if(newPassword){

            const {password:userPassword}=(await select('users',['password'],`id = '${id}'`))[0]

            if(!await verifyPassword({password:userPassword},password)){
                return res.status(401).json({error:'Authentication error'})
            }

            setArray.push({password:await encryptPassword(newPassword)})
        }

        if(profile_image){
            setArray.push({profile_image})
        }

        if(setArray.length === 0){
            return res.status(200).json({message:'No changes'})
        }

        if(setArray.length === 1){

            const setObject=setArray[0]

            const key = (Object.keys(setObject))[0]
        
            set=` ${key} = '${setObject[key]}'`
        }else{
            setArray.map((setValue,index)=>{

                const key = (Object.keys(setValue))[0]
                const value= (Object.values(setValue))[0]

                if(index === 0){
                    set=` ${key} = '${value}'`
                    return
                }

                set= `${set} , ${key} = '${value}'`

                return
            })
        }

        const conditionId=`id = '${id}'`

        await update('users',set,conditionId)

        const user=(await select('users',['id','name','email','profile_image'],conditionId))[0] 

        return res.status(200).json(user)
     
    } catch (error) {

        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }

}

async function profile(req,res){
    try {

        const user=req.user

        if(!user){
            return res.status(404).json({error:'User not found'})
        }

        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const userControllers={
    createUser,
    updateUser,
    profile
}

module.exports=userControllers