import { PrismaClient } from '@prisma/client';
import { HotelController } from '../controllers/hotel.controller';
import { HotelRepository } from '../../repositories/hotel/hotel.repository';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

const hotelRepository = new HotelRepository();
const hotelController = new HotelController(hotelRepository);

const hotelRouter = (server: FastifyInstance, options: any, done: () => void) => {
  
    server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await hotelController.index(req, reply);
      done();
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await hotelController.create(req, reply);
      reply.status(201).send(`hotel created`)
      done();
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
    try {
      await hotelController.update(req, reply);
      reply.status(200).send(`hotel updated`);
      done();
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  server.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    try {
      await hotelController.delete(req, reply);
      reply.status(200).send(`hotel deleted`);
      done();
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  done();
};

export default hotelRouter;
