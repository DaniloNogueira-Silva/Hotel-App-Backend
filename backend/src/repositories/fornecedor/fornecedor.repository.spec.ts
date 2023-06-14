import { PrismaClient, Fornecedor } from "@prisma/client";
import { FornecedorRepository } from "./fornecedor.repository";

const prisma = new PrismaClient();

describe("FornecedorRepository", () => {
  let fornecedorRepository: FornecedorRepository;

  beforeAll(() => {
    fornecedorRepository = new FornecedorRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.fornecedor.deleteMany();
  });

  test("findAll should return an array of fornecedores", async () => {
    const fornecedoresToCreate: Fornecedor[] = [
      {
        id: 1,
        name: "Fornecedor A",
        cnpj: "123456789",
      },
      {
        id: 2,
        name: "Fornecedor B",
        cnpj: "987654321",
      },
    ];

    for (const fornecedor of fornecedoresToCreate) {
      await prisma.fornecedor.create({ data: fornecedor });
    }

    const fornecedores = await fornecedorRepository.findAll();

    expect(fornecedores).toHaveLength(2);
    expect(fornecedores[0].name).toBe("Fornecedor A");
    expect(fornecedores[0].cnpj).toBe("123456789");
    expect(fornecedores[1].name).toBe("Fornecedor B");
    expect(fornecedores[1].cnpj).toBe("987654321");
  });

  test("create should create a new fornecedor", async () => {
    const newFornecedor: Fornecedor = {
      id: 1,
      name: "Fornecedor A",
      cnpj: "123456789",
    };

    const createdFornecedor = await fornecedorRepository.create(newFornecedor);

    expect(createdFornecedor.id).toBeDefined();
    expect(createdFornecedor.name).toBe("Fornecedor A");
    expect(createdFornecedor.cnpj).toBe("123456789");
  });

  test("delete should delete a fornecedor by id", async () => {
    const createdFornecedor = await prisma.fornecedor.create({
      data: {
        id: 1,
        name: "Fornecedor A",
        cnpj: "123456789",
      },
    });

    const deleted = await fornecedorRepository.delete(createdFornecedor.id);

    expect(deleted).toBe(true);

    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id: createdFornecedor.id },
    });

    expect(fornecedor).toBeNull();
  });

  test("update should update a fornecedor by id", async () => {
    const createdFornecedor = await prisma.fornecedor.create({
      data: {
        id: 1,
        name: "Fornecedor A",
        cnpj: "123456789",
      },
    });

    const updatedFornecedor = await fornecedorRepository.update(createdFornecedor.id, {
      id: 1,
      name: "Updated Fornecedor A",
      cnpj: "987654321",
    });

    expect(updatedFornecedor).toEqual({
      ...createdFornecedor,
      id: 1,
      name: "Updated Fornecedor A",
      cnpj: "987654321",
    });
  });
});
