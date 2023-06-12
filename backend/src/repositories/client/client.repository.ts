import { PrismaClient, Client } from "@prisma/client";

const prisma = new PrismaClient();

export class ClientRepository {

    async findAll(id_hotel: number): Promise<Client[]> {
        return prisma.client.findMany({
            where: {id_hotel}
        });
    }

    async create(data: Client, id_hotel: number): Promise<Client>{
        const {id, ...clientData} = data;

        const client = await prisma.client.create({
            data: {
                ...clientData,
                id_hotel,
            },
        });
        return client;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.client.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Client): Promise<Client | null> {
        const client = await prisma.client.update({
          where: { id },
          data,
        });
        if (!client) {
          return null;
        }
        return client;
      }
    
}