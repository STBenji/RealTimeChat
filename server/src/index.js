import express from 'express'
import userRoute from './routes/user.routes.js'
import indexRoute from './routes/index.routes.js'

const app = express()
app.use(express.json())

app.use(indexRoute)

// user routes
app.use(userRoute)

app.listen(3000)
console.log('Server running on port 3000')
