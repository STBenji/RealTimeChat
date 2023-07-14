import { pool } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = async(req, res) => {

  try {
    const [result] = await pool.query('SELECT * FROM usuarios')
    console.log(result)
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
    res.status(401).send({ message : 'Error al obtener los usuarios' })
  }

}

export const register = async (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body

  try {
    let passHash = await bcrypt.hash(contrasena, 8)
    const [userExist] = await pool.query('SELECT * FROM usuarios WHERE email = ? ', [email])

    if (userExist >= [0]) return res.status(404).send({ message: 'Ya existe un usuario con las mismas credenciales' })

    const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)', [nombre, apellido, email, passHash])

    res.status(200).send({
     message : 'Usuario creado exitosamente'
    })
  } catch (error) {
    res.status(400).send({ error: 'Ah ocurrido un error' })
  }
}

export const login = async (req, res) => {
  const { email, contrasena } = req.body
  try {
    const [userExist] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
    if (!userExist[0]) {
      return res.status(404).send({ message: 'El usuario no se encuentra registrado' })
    } else {
      const isPasswordValid = await bcrypt.compare(contrasena, userExist[0].contrasena)
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Digite la contraseña correcta' })
      }

      const payload = {
        id_usuario: userExist[0].id_usuario,
        nombre: userExist[0].nombre,
        apellido: userExist[0].apellido,
        email: userExist[0].email
      }

      const jsonWebToken = jwt.sign(payload, 'secretKey', { expiresIn: '2h' })
      res.status(200).send({ token: jsonWebToken })
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

export const searchUser = async (req, res) => {
  const { nombre } = req.query

  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE CONCAT(nombre, " ", apellido) LIKE ?', [`%${nombre}%`])
    if(user.length === 0) return res.status(401).send({message : 'No se encontró al usuario'})
    res.status(200).send({ user })
  } catch (error) {
    res.status(401).send({ message : 'ah ocurrido un error inesperado' })
  }
}
