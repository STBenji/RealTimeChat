import { pool } from '../db.js'

// obtener las solicitudes por ID
export const getRequestByID = async (req, res) => {
  const { recibir_solicitud_id } = req.params

  // verificar que tenga solicitudes pendientes
  try {
    const [responseRequest] = await pool.query('SELECT * FROM solicitudes WHERE recibir_solicitud_id = ? and estado = "pendiente"', [recibir_solicitud_id])

    if (responseRequest.length === 0) {
      res.status(401).send({ message: 'NO tienes ninguna solicitud de amistad' })
    } else {
      res.status(200).send({ responseRequest })
    }
  } catch (error) {}
}

// ver los amigos agregados
export const getFriendAcceptByID = async (req, res) => {
  const { recibir_solicitud_id } = req.params

  // verificar que tenga solicitudes pendientes
  try {
    const [responseRequest] = await pool.query('SELECT * FROM solicitudes WHERE recibir_solicitud_id = ? and estado = "aceptada"', [recibir_solicitud_id])

    if (responseRequest.length === 0) {
      res.status(401).send({ message: 'NO tienes ningun amigo agregado' })
    } else {
      res.status(200).send({ responseRequest })
    }
  } catch (error) {}
}

// Enviar una solicitud de amistad
export const sendSolicitud = async (req, res) => {
  try {
    const { solicitud_id, recibir_solicitud_id } = req.query

    // verificar si ya exite una solicitud
    const [existingRequestRows] = await pool.query('SELECT COUNT(*) AS count FROM solicitudes WHERE solicitud_id = ? AND recibir_solicitud_id = ?', [solicitud_id, recibir_solicitud_id])

    const existingRequestCount = existingRequestRows[0].count
    if (existingRequestCount > 0) {
      return res.status(400).send({ message: 'Ya has enviado una solicitud de amistad a este usuario' })
    }

    // enviar solicitud
    await pool.query('INSERT INTO solicitudes (solicitud_id, recibir_solicitud_id, estado) VALUES (?, ?, "pendiente")', [solicitud_id, recibir_solicitud_id])

    res.status(200).send({ message: 'Solicitud de amistad enviada correctamente' })
  } catch (error) {
    res.status(500).send('Error al enviar la solicitud de amistad')
  }
}

// aceptar una solicitud de amistad
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id_solicitud } = req.params

    // Verificar si la solicitud existe y está pendiente
    const [requestRows] = await pool.query('SELECT * FROM solicitudes WHERE id_solicitud = ? AND estado = "pendiente"', [id_solicitud])

    if (requestRows.length === 0) {
      return res.status(404).send('La solicitud de amistad no existe o no está pendiente')
    }

    // Actualizar el estado de la solicitud a "aceptada"
    const updateQuery = 'UPDATE solicitudes SET estado = "aceptada" WHERE id_solicitud = ?'
    await pool.query(updateQuery, [id_solicitud])

    res.status(200).send({ message: 'Solicitud de amistad aceptada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error al aceptar la solicitud de amistad' })
  }
}

// Rechazar una solicitud de amistad
export const rejectFriendRequest = async (req, res) => {
  try {
    const { id_solicitud } = req.params

    // Verificar si la solicitud existe y está pendiente
    const [requestRows] = await pool.query('SELECT * FROM solicitudes WHERE id_solicitud = ? AND estado = "pendiente"', [id_solicitud])
    if (requestRows.length === 0) {
      return res.status(404).send({ message: 'La solicitud de amistad no existe o no está pendiente' })
    }

    // Actualizar el estado de la solicitud a "rechazada"
    await pool.query('UPDATE solicitudes SET estado = "rechazada" WHERE id_solicitud = ?', [id_solicitud])

    res.status(200).send({ message: 'Solicitud de amistad rechazada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error al rechazar la solicitud de amistad' })
  }
}
