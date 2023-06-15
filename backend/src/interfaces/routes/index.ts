import { FastifyInstance } from 'fastify';
import hotelRouter from '../routes/hotel/hotel.routes'
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = fastify();
server.register(fastifyCors);

const routes = (server: FastifyInstance): void => {
  server.register(hotelRouter, { prefix: '/hotel' });
};

export default routes