const {body}=require('express-validator')

function albumValidation(){
    return[
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({max:35,min:3})
            .withMessage('Name too big or small')
    ]
}

module.exports=albumValidation