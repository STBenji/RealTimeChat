import { pool } from '../db.js'
import { registerDataSchema, loginDataSchema } from '../schemas/user.schemas.js'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
import bcrypt from 'bcrypt'
// import Joi from 'joi'

export const checkUserExist = async (req, res, next) => {
    const { email } = req.body

    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])

        if (userExist.length > 0) {
            return res.status(409).send({ message: 'El usuario ya está registrado' })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Error al verificar el usuario' })
    }
}

export const checkRegisterData = (req, res, next) => {
    const { nombre, apellido, email, contrasena } = req.body


    try {
        const { error } = registerDataSchema.validate({ nombre, apellido, email, contrasena })
        if (error !== undefined) return res.send({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        res.status(500).json({ message: 'Error inesperado' })
    }
}

export const checkLoginData = (req, res, next) => {
    const { email, contrasena } = req.body


    try {
        const { error } = loginDataSchema.validate({ email, contrasena })
        if (error !== undefined) return res.send({ message: 'Los datos ingresados no son válidos, verifícalos.' })

        next()
    } catch (error) {
        res.status(500).json({ message: 'Error inesperado' })
    }
}

export const hashPassword = async (req, res, next) => {
    const { contrasena } = req.body

    try {
        const passwordHash = await bcrypt.hash(contrasena, 10)
        req.body.contrasena = passwordHash
        next()
    } catch (error) {
        res.status(500).send({ message: 'Error inesperado' })
    }
}

export const comparePassword = async (req, res, next) => {
    const { email, contrasena } = req.body
    try {
        const [userExist] = await pool.query('SELECT contrasena FROM usuarios WHERE email = ?', email)

        const passwordCompare = await bcrypt.compare(contrasena, userExist[0].contrasena)
        if (!passwordCompare) {
            return res.status(401).send({ message: 'Contraseña incorrecta' })
        }
        next()
    } catch (error) {}
}

export const createToken = async (req, res, next) => {
    const { email } = req.body
    try {
        const [userExist] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if (!userExist[0]) return res.status(500).send({ message: 'El usuario no se encuentra registrado' })

        const payload = {
            id_usuario: userExist[0].id_usuario,
            nombre: userExist[0].nombre,
            apellido: userExist[0].apellido,
            email: userExist[0].email,
        }
        const token = jwt.sign(payload, 'secret-keY', { expiresIn: 2 })
        res.locals.token = token
        next()
    } catch (error) {
        res.status(500).send({ message: 'Error al generar el token' })
    }
}
