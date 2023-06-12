import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {

    async findAll(id_hotel: number): Promise<User[]> {
        return prisma.user.findMany({
            where: {id_hotel}
        });
    }

    async create(data: User, id_hotel: number): Promise<User>{
        const {id, ...userData} = data;

        const user = await prisma.user.create({
            data: {
                ...userData,
                id_hotel,
            },
        });
        return user;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.user.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: User): Promise<User | null> {
        const user = await prisma.user.update({
          where: { id },
          data,
        });
        if (!user) {
          return null;
        }
        return user;
      }
    
}