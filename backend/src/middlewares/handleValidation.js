const { validationResult } = require('express-validator');

async function handleValidation(req,res,next){
    const errors=validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extractErrors=[]

    errors.array().map(error => extractErrors.push(error.msg))

    return res.status(500).json({errors:extractErrors})
}

module.exports=handleValidation