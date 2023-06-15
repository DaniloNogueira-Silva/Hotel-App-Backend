import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { HotelRepository } from "../../repositories/hotel/hotel.repository";
import { Hotel } from "@prisma/client";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class HotelController {
  repository: HotelRepository;

  constructor(repository: HotelRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    const hotels: Hotel[] = await this.repository.findAll();
    res.send(hotels);
  };

  create: RequestHandler = async (req, res) => {
    const hotelInterface: Hotel = req.body as Hotel;
    const hotel: Hotel = await this.repository.create(hotelInterface);
    res.send(hotel);
  };

  update: RequestHandler = async (req, res) => {
    const hotelInterface: Hotel = req.body as Hotel;
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const hotel: Hotel | null = await this.repository.update(
      Number(params.id),
      hotelInterface
    );
    if (!hotel) {
      res.status(404).send({ error: "Hotel not found" });
      return;
    }
    res.send(hotel);
  };

  delete: RequestHandler = async (req, res) => {
    const params = req.params as { id: string }; //    Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const deleted: boolean = await this.repository.delete(Number(params.id));
    if (!deleted) {
      res.status(404).send({ error: "Hotel not found" });
      return;
    }
    res.code(204).send();
  };
}
