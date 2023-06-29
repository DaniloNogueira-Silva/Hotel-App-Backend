import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { RoomRepository } from "../../repositories/room/room.repository";
import { Room } from "@prisma/client";
import jwt from 'jsonwebtoken'

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class RoomController {
  repository: RoomRepository;

  constructor(repository: RoomRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
  
    if (!token) {
      res.status(401).send({ error: 'Authorization token missing' });
      return;
    }
  
    const { id_hotel } = jwt.decode(token) as { id_hotel: number };
    
    const rooms: Room[] = await this.repository.findAll(id_hotel);
    res.send(rooms);
  };

  create: RequestHandler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
  
    if (!token) {
      res.status(401).send({ error: 'Authorization token missing' });
      return;
    }
  
    const { id_hotel } = jwt.decode(token) as { id_hotel: number };
    
    const roomInterface: Room = req.body as Room;
    const room: Room = await this.repository.create(roomInterface, id_hotel, roomInterface.id_room_type);
    res.send(room);
  };

  update: RequestHandler = async (req, res) => {
    const roomInterface: Room = req.body as Room;
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const room: Room | null = await this.repository.update(
      Number(params.id),
      roomInterface
    );
    if (!room) {
      res.status(404).send({ error: "Room not found" });
      return;
    }
    res.send(room);
  };

  delete: RequestHandler = async (req, res) => {
    const params = req.params as { id: string }; //    Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const deleted: boolean = await this.repository.delete(Number(params.id));
    if (!deleted) {
      res.status(404).send({ error: "Room not found" });
      return;
    }
    res.code(204).send();
  };
}
