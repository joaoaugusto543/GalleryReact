const { body } = require('express-validator')

function createUserValidation(){
    return[
        body('name')
            .isString()
            .withMessage('Name is required')
            .isLength({max:30,min:3})
            .withMessage('Name too big or small'),
        body('email')
            .isString()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email'),
        body('password')
            .isString()
            .withMessage('Password is required')
            .isLength({min:6})
            .withMessage('Password too small')
            .custom((value,{req})=>{
                if(value !== req.body.confirmPassword){
                    throw new Error('Passwords need to be the same')
                }

                return true
            }),
        body('profile_image')
            .optional()
            .isString()
            .withMessage('Image is required')
            .custom((value)=>{

                if(value.indexOf('data:image/') !== -1){
                    return true
                }

                throw new Error('Invalid image')
            })
    ]
}

function updateUserValidation(){
    return[
        body('name')
        .optional()
        .isString()
        .withMessage('Name is required')
        .isLength({max:30,min:3})
        .withMessage('Name too big or small'),
        body('password')
        .optional()
        .isString()
        .withMessage('Password is required')
        .isEmail()
        .isLength({min:6})
        .withMessage('Password too small')
        .custom((value,{req})=>{

            if(value!==req.body.confirmPassword){
                throw new Error('Passwords need to be the same')
            }

            return true
        }),
        body('profile_image')
        .optional()
        .isString()
        .withMessage('Image is required')
        .custom((value)=>{

            if(value.indexOf('data:image/') !== -1){
                return true
            }

            throw new Error('Invalid image')
        })
    ]
}

const userValidation={
    createUserValidation,
    updateUserValidation
}

module.exports=userValidation