import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {

    async findAll(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async create(id_category: number,id_pub: number, id_fornecedor: number, data: Product): Promise<Product>{
        const {id, ...productData} = data;

        const product = await prisma.product.create({
            data: {
                ...productData,
                id_category,
                id_pub,
                id_fornecedor,
            },
        });
        return product;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.product.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Product): Promise<Product | null> {
        const product = await prisma.product.update({
          where: { id },
          data,
        });
        if (!product) {
          return null;
        }
        return product;
      }
    
}