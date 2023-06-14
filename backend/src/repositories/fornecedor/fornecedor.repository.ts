import { PrismaClient, Fornecedor } from "@prisma/client";

const prisma = new PrismaClient();

export class FornecedorRepository {

    async findAll(): Promise<Fornecedor[]> {
        return prisma.fornecedor.findMany();
    }

    async create(data: Fornecedor): Promise<Fornecedor>{
        const {id, ...fornecedorData} = data;

        const fornecedor = await prisma.fornecedor.create({
            data: {
                ...fornecedorData,
            },
        });
        return fornecedor;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.fornecedor.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Fornecedor): Promise<Fornecedor | null> {
        const fornecedor = await prisma.fornecedor.update({
          where: { id },
          data,
        });
        if (!fornecedor) {
          return null;
        }
        return fornecedor;
      }
    
}