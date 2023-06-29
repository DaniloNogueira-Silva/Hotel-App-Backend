import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { BookingRepository } from "../../repositories/booking/booking.repository";
import { Booking } from "@prisma/client";

type MyRequest = FastifyRequest<{
  Querystring: { id_hotel: string };
}>;

type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class BookingController {
  repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  index: RequestHandler = async (req, res) => {
    const hotelId = Number(req.query.id_hotel);

    if (isNaN(hotelId)) {
      res.status(400).send({ error: "Invalid hotel ID" });
      return;
    }

    const bookings: Booking[] = await this.repository.findAll(hotelId);
    res.send(bookings);
  };

  create: RequestHandler = async (req, res) => {
    const bookingInterface: Booking = req.body as Booking;
    const booking: Booking = await this.repository.create(
      bookingInterface,
      bookingInterface.id_hotel,
      bookingInterface.id_room,
      bookingInterface.id_client
    );
    res.send(booking);
  };

  update: RequestHandler = async (req, res) => {
    const bookingInterface: Booking = req.body as Booking;
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const booking: Booking | null = await this.repository.update(
      Number(params.id),
      bookingInterface
    );
    if (!booking) {
      res.status(404).send({ error: "Booking not found" });
      return;
    }
    res.send(booking);
  };

  delete: RequestHandler = async (req, res) => {
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const deleted: boolean = await this.repository.delete(Number(params.id));
    if (!deleted) {
      res.status(404).send({ error: "Booking not found" });
      return;
    }
    res.code(204).send();
  };
}
