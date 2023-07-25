import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const loginDataSchema = Joi.object({
    email: Joi.string().email().required().min(5).max(60),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})

export const registerDataSchema = Joi.object({
    nombre: Joi.string().required().min(2).max(50),
    apellido: Joi.string().required().min(2).max(45),
    email: Joi.string().email().required().min(5).max(60),
    contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX),
})
