import { PrismaClient, RoomType } from "@prisma/client";
import { RoomTypeRepository } from './roomtype.repository';

const prisma = new PrismaClient();

describe("RoomTypeRepository", () => {
  let roomTypeRepository: RoomTypeRepository;

  beforeAll(() => {
    roomTypeRepository = new RoomTypeRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // afterEach(async () => {
  //   await prisma.roomType.deleteMany();
  // });

  test("findAll should return an array of room types for a given hotel id", async () => {
    const hotelId = 1;
    const roomTypesToCreate: RoomType[] = [
      {
        id: 1,
        name: "Room Type A",
        description: "room x",
        capacity: 2,
        price: 100,
        id_hotel: hotelId,
      },
      {
        id: 2,
        name: "Room Type B",
        description: "room y",
        capacity: 4,
        price: 150,
        id_hotel: hotelId,
      },
    ];

    for (const roomType of roomTypesToCreate) {
      await prisma.roomType.create({ data: roomType });
    }

    const roomTypes = await roomTypeRepository.findAll(hotelId);

    expect(roomTypes).toHaveLength(2);
    expect(roomTypes[0].name).toBe("Room Type A");
    expect(roomTypes[0].description).toBe("room x");
    expect(roomTypes[0].capacity).toBe(2);
    expect(roomTypes[0].price).toBe(100);
    expect(roomTypes[0].id_hotel).toBe(hotelId);

    expect(roomTypes[1].name).toBe("Room Type B");
    expect(roomTypes[0].description).toBe("room x");
    expect(roomTypes[1].capacity).toBe(4);
    expect(roomTypes[1].price).toBe(150);
    expect(roomTypes[1].id_hotel).toBe(hotelId);
  });

  test("create should create a new room type for a given hotel id", async () => {
    const hotelId = 1;
    const newRoomType: RoomType = {
      id: 1,
      name: "Room Type A",
      description: "room x",
      capacity: 2,
      price: 100,
      id_hotel: hotelId,
    };

    const createdRoomType = await roomTypeRepository.create(newRoomType, hotelId);

    expect(createdRoomType.id).toBeDefined();
    expect(createdRoomType.name).toBe("Room Type A");
    expect(createdRoomType.description).toBe("room x");
    expect(createdRoomType.capacity).toBe(2);
    expect(createdRoomType.price).toBe(100);
    expect(createdRoomType.id_hotel).toBe(hotelId);
  });

  test("delete should delete a room type by id", async () => {
    const createdRoomType = await prisma.roomType.create({
      data: {
        id: 1,
        name: "Room Type A",
        description: "room x",
        capacity: 2,
        price:
        100,
        id_hotel: 1,
      },
    });

    const deleted = await roomTypeRepository.delete(createdRoomType.id);

    expect(deleted).toBe(true);

    const roomType = await prisma.roomType.findUnique({
      where: { id: createdRoomType.id },
    });

    expect(roomType).toBeNull();
  });

  test("update should update a room type by id", async () => {
    const createdRoomType = await prisma.roomType.create({
      data: {
        id: 1,
        name: "Room Type A",
        description: "room x",
        capacity: 2,
        price: 100,
        id_hotel: 1,
      },
    });

    const updatedRoomType = await roomTypeRepository.update(createdRoomType.id, {
      id: 1,
      name: "Updated Room Type A",
      description: "update room x",
      capacity: 3,
      price: 120,
      id_hotel: 1,
    });

    expect(updatedRoomType).toEqual({
      ...createdRoomType,
      name: "Updated Room Type A",
      description: "update room x",
      capacity: 3,
      price: 120,
      id_hotel: 1,
    });
  });
});

