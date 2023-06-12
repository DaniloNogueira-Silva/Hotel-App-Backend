import { PrismaClient, Room } from "@prisma/client";

const prisma = new PrismaClient();

export class RoomRepository {

    async findAll(id_hotel: number): Promise<Room[]> {
        return prisma.room.findMany({
            where: {id_hotel}
        });
    }

    async create(data: Room, id_hotel: number, id_room_type: number): Promise<Room>{
        const {id, ...roomData} = data;

        const room = await prisma.room.create({
            data: {
                ...roomData,
                id_room_type,
                id_hotel,
            },
        });
        return room;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.room.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Room): Promise<Room | null> {
        const room = await prisma.room.update({
          where: { id },
          data,
        });
        if (!room) {
          return null;
        }
        return room;
      }
    
}