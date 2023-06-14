import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {

    async findAll(): Promise<Category[]> {
        return prisma.category.findMany();
    }

    async create(data: Category): Promise<Category>{
        const {id, ...categoryData} = data;

        const category = await prisma.category.create({
            data: {
                ...categoryData,
            },
        });
        return category;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.category.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Category): Promise<Category | null> {
        const category = await prisma.category.update({
          where: { id },
          data,
        });
        if (!category) {
          return null;
        }
        return category;
      }
    
}