import express from 'express'
import indexRoute from './routes/index.routes.js'
import userRoute from './routes/user.routes.js'
import requestSend from './routes/solicitudAmistad.routes.js'
import cors from 'cors'

import { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(indexRoute)

// user routes
app.use('/api', userRoute)
app.use('/api', requestSend)

app.use((req, res) => {
  res.status(404).json({
    message: 'Este endpoint no se encuentra disponible'
  })
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
