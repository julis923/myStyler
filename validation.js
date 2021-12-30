//Imports
const Joi = require('joi');

//Registration Validation Function
const validateRegistration = (data) => {
    
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data)
}

//Login Validation Function
const validateLogin = (data) => {

    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data)

}

const validateUpdate = (type, data) => {
    if (type === 'name') {
        const schema =  Joi.string().required()
        return schema.validate(data)
    } else if (type === 'email') {
        const schema = Joi.string().email().required()
        return schema.validate(data)
    } else {
        return null;
    }
}

const validatePassword = (data) => {
    const schema = Joi.string().min(6).required()
    return schema.validate(data)
}

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.validateUpdate = validateUpdate;
module.exports.validatePassword = validatePassword;
