import Fastify from 'fastify'
import cors from "@fastify/cors"
import routes from './interfaces/routes'

const server = Fastify()
server.register(cors)
routes(server)
server.listen({port: 4421
})
.then( () => {
    console.log('HTTP Server running')
})