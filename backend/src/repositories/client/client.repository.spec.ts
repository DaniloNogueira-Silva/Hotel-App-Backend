import { PrismaClient, Client } from "@prisma/client";
import { ClientRepository } from "./client.repository";

const prisma = new PrismaClient();

describe("ClientRepository", () => {
  let clientRepository: ClientRepository;

  beforeAll(() => {
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  test("findAll should return an array of clients for a given hotel id", async () => {
    const hotelId = 1;
    const clientsToCreate: Client[] = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        cpf: "123456789",
        phone: "991234567",
        id_hotel: hotelId,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        cpf: "991234567",
        phone: "123456789",
        id_hotel: hotelId,
      },
    ];

    for (const client of clientsToCreate) {
      await prisma.client.create({ data: client });
    }

    const clients = await clientRepository.findAll(hotelId);

    expect(clients).toHaveLength(2);
    expect(clients[0].name).toBe("John Doe");
    expect(clients[0].email).toBe("johndoe@example.com");
    expect(clients[0].cpf).toBe("123456789");
    expect(clients[0].phone).toBe("991234567");
    expect(clients[0].id_hotel).toBe(hotelId);

    expect(clients[1].name).toBe("Jane Smith");
    expect(clients[1].email).toBe("janesmith@example.com");
    expect(clients[1].cpf).toBe("991234567");
    expect(clients[1].phone).toBe("123456789");
    expect(clients[1].id_hotel).toBe(hotelId);
  });

  test("create should create a new client for a given hotel id", async () => {
    const hotelId = 1;
    const newClient: Client = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      cpf: "123456789",
      phone: "991234567",
      id_hotel: hotelId,
    };

    const createdClient = await clientRepository.create(newClient, hotelId);

    expect(createdClient.id).toBeDefined();
    expect(createdClient.name).toBe("John Doe");
    expect(createdClient.email).toBe("johndoe@example.com");
    expect(createdClient.cpf).toBe("123456789");
    expect(createdClient.phone).toBe("991234567");
    expect(createdClient.id_hotel).toBe(hotelId);
  });

  test("delete should delete a client by id", async () => {
    const createdClient = await prisma.client.create({
      data: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        cpf: "123456789",
        phone: "991234567",
        id_hotel: 1,
      },
    });

    const deleted = await clientRepository.delete(createdClient.id);

    expect(deleted).toBe(true);

    const client = await prisma.client.findUnique({
      where: { id: createdClient.id },
    });

    expect(client).toBeNull();
  });

  test("update should update a client by id", async () => {
    const createdClient = await prisma.client.create({
      data: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        cpf: "123456789",
        phone: "991234567",
        id_hotel: 1,
      },
    });

    const updatedClient = await clientRepository.update(createdClient.id, {
      id: 1,
      name: "Updated John Doe",
      email: "updatedjohndoe@example.com",
      cpf: "uptade123456789",
      phone: "update991234567",
      id_hotel: 1,
    });

    expect(updatedClient).toEqual({
      ...createdClient,
      name: "Updated John Doe",
      email: "updatedjohndoe@example.com",
      cpf: "uptade123456789",
      phone: "update991234567",
      id_hotel: 1,
    });
  });
});
