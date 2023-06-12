import { PrismaClient, Pub } from "@prisma/client";
import { PubRepository } from "./pub.repository";

const prisma = new PrismaClient();

describe("PubRepository", () => {
  let pubRepository: PubRepository;

  beforeAll(() => {
    pubRepository = new PubRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.pub.deleteMany();
  });

  test("findAll should return an array of pubs for a given hotel id", async () => {
    const hotelId = 1;
    const pubsToCreate: Pub[] = [
      {
        id: 1,
        name: "Pub A",
        id_hotel: hotelId,
      },
      {
        id: 2,
        name: "Pub B",
        id_hotel: hotelId,
      },
    ];

    for (const pub of pubsToCreate) {
      await prisma.pub.create({ data: pub });
    }

    const pubs = await pubRepository.findAll(hotelId);

    expect(pubs).toHaveLength(2);
    expect(pubs[0].name).toBe("Pub A");
    expect(pubs[0].id_hotel).toBe(hotelId);

    expect(pubs[1].name).toBe("Pub B");
    expect(pubs[1].id_hotel).toBe(hotelId);
  });

  test("create should create a new pub for a given hotel id", async () => {
    const hotelId = 1;
    const newPub: Pub = {
      id: 1,
      name: "Pub A",
      id_hotel: hotelId,
    };

    const createdPub = await pubRepository.create(newPub, hotelId);

    expect(createdPub.id).toBeDefined();
    expect(createdPub.name).toBe("Pub A");
    expect(createdPub.id_hotel).toBe(hotelId);
  });

  test("delete should delete a pub by id", async () => {
    const createdPub = await prisma.pub.create({
      data: {
        id: 1,
        name: "Pub A",
        id_hotel: 1,
      },
    });

    const deleted = await pubRepository.delete(createdPub.id);

    expect(deleted).toBe(true);

    const pub = await prisma.pub.findUnique({
      where: { id: createdPub.id },
    });

    expect(pub).toBeNull();
  });

  test("update should update a pub by id", async () => {
    const createdPub = await prisma.pub.create({
      data: {
        id: 1,
        name: "Pub A",
        id_hotel: 1,
      },
    });

    const updatedPub = await pubRepository.update(createdPub.id, {
      id: 1,
      name: "Update Pub A",
      id_hotel: 1,
    });

    expect(updatedPub).toEqual({
      ...createdPub,
      id: 1,
      name: "Update Pub A",
      id_hotel: 1,
    });
  });
});
