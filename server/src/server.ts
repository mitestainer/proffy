require('dotenv').config()

import express from 'express'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())

app.use(routes)

app.listen(3333)