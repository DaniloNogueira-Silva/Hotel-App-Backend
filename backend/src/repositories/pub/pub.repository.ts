import { PrismaClient, Pub } from "@prisma/client";

const prisma = new PrismaClient();

export class PubRepository {

    async findAll(id_hotel: number): Promise<Pub[]> {
        return prisma.pub.findMany({
            where: {id_hotel}
        });
    }

    async create(data: Pub, id_hotel: number): Promise<Pub>{
        const {id, ...pubData} = data;

        const pub = await prisma.pub.create({
            data: {
                ...pubData,
                id_hotel,
            },
        });
        return pub;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.pub.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Pub): Promise<Pub | null> {
        const pub = await prisma.pub.update({
          where: { id },
          data,
        });
        if (!pub) {
          return null;
        }
        return pub;
      }
    
}