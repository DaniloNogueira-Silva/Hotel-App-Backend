import { PrismaClient, Booking } from "@prisma/client";

const prisma = new PrismaClient();

export class BookingRepository {

    async findAll(id_hotel: number): Promise<Booking[]> {
        return prisma.booking.findMany({
            where: {id_hotel}
        });
    }

    async create(data: Booking, id_hotel: number, id_room: number, id_client: number): Promise<Booking>{
        const {id, ...roomData} = data;

        const booking = await prisma.booking.create({
            data: {
                ...roomData,
                id_room,
                id_hotel,
                id_client
            },
        });
        return booking;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.booking.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Booking): Promise<Booking | null> {
        const booking = await prisma.booking.update({
          where: { id },
          data,
        });
        if (!booking) {
          return null;
        }
        return booking;
      }
    
}