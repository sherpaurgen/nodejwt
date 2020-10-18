const Joi = require('joi');
//validation


const registerValidation = (data) => {
    console.log("request body" + data)
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)

}

const loginValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data.body)

}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation