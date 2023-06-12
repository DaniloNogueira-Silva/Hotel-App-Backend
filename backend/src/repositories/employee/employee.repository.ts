import { PrismaClient, Employee } from "@prisma/client";

const prisma = new PrismaClient();

export class EmployeeRepository {

    async findAll(id_hotel: number): Promise<Employee[]> {
        return prisma.employee.findMany({
            where: {id_hotel}
        });
    }

    async create(data: Employee, id_hotel: number): Promise<Employee>{
        const {id, ...employeeData} = data;

        const employee = await prisma.employee.create({
            data: {
                ...employeeData,
                id_hotel,
            },
        });
        return employee;
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await prisma.employee.delete({
            where: {id},
        });
        return deleteResult !== null;
    }

    async update(id: number, data: Employee): Promise<Employee | null> {
        const employee = await prisma.employee.update({
          where: { id },
          data,
        });
        if (!employee) {
          return null;
        }
        return employee;
      }
    
}