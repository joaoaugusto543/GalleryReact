const {body} = require('express-validator')

function createImageValidation(){
    return [
        body('name')
            .optional()
            .isString()
            .withMessage('Invalid name')
            .isLength({max:30,min:1})
            .withMessage('Name too big or small'),
        body('description')
            .optional()
            .isString()
            .withMessage('Invalid description')
            .isLength({min:1})
            .withMessage('Description too small'),
        body('image')
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

function updateImageValidation(){
    return [
        body('name')
            .optional()
            .isString()
            .withMessage('Invalid name')
            .isLength({max:30})
            .withMessage('Name too big or small'),
            body('description')
        .optional()
            .isString()
            .withMessage('Invalid description')
            .isLength()
            .withMessage('Description too small')
    ]
}

const imageValidation={
    createImageValidation,
    updateImageValidation
}

module.exports=imageValidation