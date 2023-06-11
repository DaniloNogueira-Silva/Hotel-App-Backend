import { PrismaClient, Hotel } from "@prisma/client";

const prisma = new PrismaClient();

export class HotelRepository {
  async findAll(): Promise<Hotel[]> {
    return prisma.hotel.findMany();
  }

  async findById(id: number): Promise<Hotel | null> {
    return prisma.hotel.findUnique({ where: { id } });
  }

  async create(data: Hotel): Promise<Hotel> {
    const { ...hotelData } = data;
    const hotel = await prisma.hotel.create({
      data: {
        ...hotelData,
      },
    });
    return hotel;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await prisma.hotel.delete({
      where: { id },
    });

    return deleteResult !== null;
  }

  async update(id: number, data: Hotel): Promise<Hotel | null> {
    const hotel = await prisma.hotel.update({
      where: { id },
      data,
    });
    if (!hotel) {
      return null;
    }
    return hotel;
  }
}
