import { PrismaClient, Room } from "@prisma/client";
import { RoomRepository } from "./room.repository";

const prisma = new PrismaClient();

describe("RoomRepository", () => {
  let roomRepository: RoomRepository;

  beforeAll(() => {
    roomRepository = new RoomRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.room.deleteMany();
  });

  test("findAll should return an array of rooms for a given hotel id", async () => {
    const hotelId = 1;
    const typeId = 1;
    const roomsToCreate: Room[] = [
      {
        id: 1,
        number: 101,
        status: "disponível",
        id_hotel: hotelId,
        id_room_type: typeId,
      },
      {
        id: 2,
        number: 102,
        status: "reservado",
        id_hotel: hotelId,
        id_room_type: typeId,
      },
    ];

    for (const room of roomsToCreate) {
      await prisma.room.create({ data: room });
    }

    const rooms = await roomRepository.findAll(hotelId);

    expect(rooms).toHaveLength(2);
    expect(rooms[0].number).toBe(101);
    expect(rooms[0].status).toBe("disponível");
    expect(rooms[0].id_hotel).toBe(hotelId);
    expect(rooms[0].id_room_type).toBe(1);

    expect(rooms[1].number).toBe(102);
    expect(rooms[1].status).toBe("reservado");
    expect(rooms[1].id_hotel).toBe(hotelId);
    expect(rooms[1].id_room_type).toBe(1);
  });

  test("create should create a new room for a given hotel id", async () => {
    const hotelId = 1;
    const roomType = 1;
    const newRoom: Room = {
      id: 1,
      number: 101,
      status: "disponível",
      id_hotel: hotelId,
      id_room_type: roomType,
    };

    const createdRoom = await roomRepository.create(newRoom, hotelId, roomType);

    expect(createdRoom.id).toBeDefined();
    expect(createdRoom.number).toBe(101);
    expect(createdRoom.status).toBe("disponível");
    expect(createdRoom.id_hotel).toBe(hotelId);
    expect(createdRoom.id_room_type).toBe(roomType);
  });

  test("delete should delete a room by id", async () => {
    const createdRoom = await prisma.room.create({
      data: {
        id: 1,
        number: 101,
        status: "disponível",
        id_hotel: 1,
        id_room_type: 1,
      },
    });

    const deleted = await roomRepository.delete(createdRoom.id);

    expect(deleted).toBe(true);

    const room = await prisma.room.findUnique({
      where: { id: createdRoom.id },
    });

    expect(room).toBeNull();
  });

  test("update should update a room by id", async () => {
    const createdRoom = await prisma.room.create({
      data: {
        id: 1,
        number: 101,
        status: "disponível",
        id_hotel: 1,
        id_room_type: 1,
      },
    });

    const updatedRoom = await roomRepository.update(createdRoom.id, {
      id: 1,
      number: 102,
      status: "reservado",
      id_hotel: 1,
      id_room_type: 1,
    });

    expect(updatedRoom).toEqual({
      ...createdRoom,
      number: 102,
      status: "reservado",
    });
  });
});
