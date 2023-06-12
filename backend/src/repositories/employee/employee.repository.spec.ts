import { PrismaClient, Employee } from "@prisma/client";
import { EmployeeRepository } from "./employee.repository";

const prisma = new PrismaClient();

describe("EmployeeRepository", () => {
  let employeeRepository: EmployeeRepository;

  beforeAll(() => {
    employeeRepository = new EmployeeRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.employee.deleteMany();
  });

  test("findAll should return an array of employees for a given hotel id", async () => {
    const hotelId = 1;
    const employeesToCreate: Employee[] = [
      {
        id: 1,
        name: "John Doe",
        date_birth: new Date("1990-01-01"),
        date_hiring: new Date("2021-01-01"),
        salary: 5000,
        role: "Manager",
        id_hotel: hotelId,
        id_user: null
      },
      {
        id: 2,
        name: "Jane Smith",
        date_birth: new Date("1995-02-15"),
        date_hiring: new Date("2022-03-01"),
        salary: 4000,
        role: "Receptionist",
        id_hotel: hotelId,
        id_user: null
      },
    ];

    for (const employee of employeesToCreate) {
        const { id, ...employeeData } = employee;
        await prisma.employee.create({ data: employeeData });
      }
      
    const employees = await employeeRepository.findAll(hotelId);

    expect(employees).toHaveLength(2);
    expect(employees[0].name).toBe("John Doe");
    expect(employees[0].date_birth).toEqual(new Date("1990-01-01"));
    expect(employees[0].date_hiring).toEqual(new Date("2021-01-01"));
    expect(employees[0].salary).toBe(5000);
    expect(employees[0].role).toBe("Manager");
    expect(employees[0].id_hotel).toBe(hotelId);

    expect(employees[1].name).toBe("Jane Smith");
    expect(employees[1].date_birth).toEqual(new Date("1995-02-15"));
    expect(employees[1].date_hiring).toEqual(new Date("2022-03-01"));
    expect(employees[1].salary).toBe(4000);
    expect(employees[1].role).toBe("Receptionist");
    expect(employees[1].id_hotel).toBe(hotelId);
  });

  test("create should create a new employee for a given hotel id", async () => {
    const hotelId = 1;
    const newEmployee: Employee = {
      id: 1,
      name: "John Doe",
      date_birth: new Date("1990-01-01"),
      date_hiring: new Date("2021-01-01"),
      salary: 5000,
      role: "Manager",
      id_hotel: hotelId,
      id_user: null
    };

    const createdEmployee = await employeeRepository.create(newEmployee, hotelId);

    expect(createdEmployee.id).toBeDefined();
    expect(createdEmployee.name).toBe("John Doe");
    expect(createdEmployee.date_birth).toEqual(new Date("1990-01-01"));
    expect(createdEmployee.date_hiring).toEqual(new Date("2021-01-01"));
    expect(createdEmployee.salary).toBe(5000);
    expect(createdEmployee.role).toBe("Manager");
    expect(createdEmployee.id_hotel).toBe(hotelId);
  });

  test("delete should delete an employee by id", async () => {
    const createdEmployee = await prisma.employee.create({
      data: {
        id: 1,
        name: "John Doe",
        date_birth: new Date("1990-01-01"),
        date_hiring: new Date("2021-01-01"),
        salary: 5000,
        role: "Manager",
        id_hotel: 1,
      },
    });

    const deleted = await employeeRepository.delete(createdEmployee.id);

    expect(deleted).toBe(true);

    const employee = await prisma.employee.findUnique({
      where: { id: createdEmployee.id },
    });

    expect(employee).toBeNull();
  });

  test("update should update an employee by id", async () => {
    const createdEmployee = await prisma.employee.create({
      data: {
        id: 1,
        name: "John Doe",
        date_birth: new Date("1990-01-01"),
        date_hiring: new Date("2021-01-01"),
        salary: 5000,
        role: "Manager",
        id_hotel: 1,
        id_user: null
      },
    });

    const updatedEmployee = await employeeRepository.update(createdEmployee.id, {
        id: 1,
        name: "John Smith",
        date_birth: new Date("1990-01-01"),
        date_hiring: new Date("2021-01-01"),
        salary: 6000,
        role: "Manager",
        id_hotel: 1,
        id_user: null
    });

    expect(updatedEmployee).toEqual({
      ...createdEmployee,
      id: 1,
        name: "John Smith",
        date_birth: new Date("1990-01-01"),
        date_hiring: new Date("2021-01-01"),
        salary: 6000,
        role: "Manager",
        id_hotel: 1,
        id_user: null
    });
  });
});
