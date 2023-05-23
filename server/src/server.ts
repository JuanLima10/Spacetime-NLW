import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv/config'
import fastify from 'fastify'

import { resolve } from 'path'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/momories'
import { uploadRoutes } from './routes/upload'


const app = fastify()

app.register(require('@fastify/multipart'))
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(cors, {
  origin: ['http://localhost:3000'],
})

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running http://localhost:3333')
  })
