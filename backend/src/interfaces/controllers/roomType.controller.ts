import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { RoomTypeRepository } from "../../repositories/roomtype/roomtype.repository";
import { RoomType } from "@prisma/client";
import jwt from 'jsonwebtoken'

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class RoomTypeController {
  repository: RoomTypeRepository;

  constructor(repository: RoomTypeRepository) {
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
    
    const roomtypes: RoomType[] = await this.repository.findAll(id_hotel);
    res.send(roomtypes);
  };

  create: RequestHandler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
  
    if (!token) {
      res.status(401).send({ error: 'Authorization token missing' });
      return;
    }
  
    const { id_hotel } = jwt.decode(token) as { id_hotel: number };
    
    const roomtypeInterface: RoomType = req.body as RoomType;
    const roomtype: RoomType = await this.repository.create(roomtypeInterface, id_hotel);
    res.send(roomtype);
  };

  update: RequestHandler = async (req, res) => {
    const roomtypeInterface: RoomType = req.body as RoomType;
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const roomtype: RoomType | null = await this.repository.update(
      Number(params.id),
      roomtypeInterface
    );
    if (!roomtype) {
      res.status(404).send({ error: "RoomType not found" });
      return;
    }
    res.send(roomtype);
  };

  delete: RequestHandler = async (req, res) => {
    const params = req.params as { id: string }; //    Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const deleted: boolean = await this.repository.delete(Number(params.id));
    if (!deleted) {
      res.status(404).send({ error: "RoomType not found" });
      return;
    }
    res.code(204).send();
  };
}
