import { pool } from '../db.js'

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios')
        res.status(200).send({ result })
    } catch (error) {
        res.status(401).send({ message: 'Error al obtener los usuarios' })
    }
}

export const register = async (req, res) => {
    const { nombre, apellido, email, contrasena } = req.body

    try {
        await pool.query('INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)', [nombre, apellido, email, contrasena])

        res.status(200).send({
            message: 'Usuario creado exitosamente',
        })
    } catch (error) {
        res.status(400).send({ error: 'Ah ocurrido un error' })
    }
}

export const login = async (req, res) => {
    try {
        const token = res.locals.token

        const response = {
            success: true,
            info: {
                message: 'Inicio de sesión exitoso',
                token: token,
            },
        }

        res.status(200).json({ response })
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido iniciar sesión' })
    }
}

export const searchUser = async (req, res) => {
    const { nombre } = req.query

    try {
        const [user] = await pool.query('SELECT * FROM usuarios WHERE CONCAT(nombre, " ", apellido) LIKE ?', [`%${nombre}%`])
        if (user.length === 0) return res.status(401).send({ message: 'No se encontró al usuario' })
        res.status(200).send({ user })
    } catch (error) {
        res.status(401).send({ message: 'ah ocurrido un error inesperado' })
    }
}
