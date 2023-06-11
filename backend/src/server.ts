import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()
const app = Fastify()

app.listen({
    port: 4421,
})
