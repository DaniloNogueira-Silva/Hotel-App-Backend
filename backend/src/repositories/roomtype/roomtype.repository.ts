import { PrismaClient, RoomType } from "@prisma/client";

const prisma = new PrismaClient();

export class RoomTypeRepository {

    async findAll(id_hotel: number): Promise<RoomType[]> {
        return prisma.roomType.findMany({
            where: {id_hotel: id_hotel}
        });
    }

    async create(data: RoomType, id_hotel: number): Promise<RoomType>{
        const {id, ...roomTypeData} = data;

        const roomtype = await prisma.roomType.create({
            data: {
                ...roomTypeData,
                id_hotel,
            },
        });
        return roomtype;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.roomType.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: RoomType): Promise<RoomType | null> {
        const roomtype = await prisma.roomType.update({
          where: { id },
          data,
        });
        if (!roomtype) {
          return null;
        }
        return roomtype;
      }
    
}