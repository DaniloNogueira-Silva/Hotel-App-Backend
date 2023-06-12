import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "./user.repository";

const prisma = new PrismaClient();

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  test("findAll should return an array of users for a given hotel id", async () => {
    const hotelId = 1;
    const usersToCreate: User[] = [
      {
        id: 1,
        email: "john.doe@example.com",
        password: "password1",
        id_hotel: hotelId,
      },
      {
        id: 2,
        email: "jane.smith@example.com",
        password: "password2",
        id_hotel: hotelId,
      },
    ];

    for (const user of usersToCreate) {
      await prisma.user.create({ data: user });
    }

    const users = await userRepository.findAll(hotelId);

    expect(users).toHaveLength(2);
    expect(users[0].email).toBe("john.doe@example.com");
    expect(users[0].password).toBe("password1");
    expect(users[0].id_hotel).toBe(hotelId);

    expect(users[1].email).toBe("jane.smith@example.com");
    expect(users[1].password).toBe("password2");
    expect(users[1].id_hotel).toBe(hotelId);
  });

  test("create should create a new user for a given hotel id", async () => {
    const hotelId = 1;
    const newUser: User = {
      id: 1,
      email: "john.doe@example.com",
      password: "password1",
      id_hotel: hotelId,
    };

    const createdUser = await userRepository.create(newUser, hotelId);

    expect(createdUser.id).toBeDefined();
    expect(createdUser.email).toBe("john.doe@example.com");
    expect(createdUser.password).toBe("password1");
    expect(createdUser.id_hotel).toBe(hotelId);
  });

  test("delete should delete a user by id", async () => {
    const createdUser = await prisma.user.create({
      data: {
        id: 1,
        email: "john.doe@example.com",
        password: "password1",
        id_hotel: 1,
      },
    });

    const deleted = await userRepository.delete(createdUser.id);

    expect(deleted).toBe(true);

    const user = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });

    expect(user).toBeNull();
  });

  test("update should update a user by id", async () => {
    const createdUser = await prisma.user.create({
      data: {
        id: 1,
        email: "john.doe@example.com",
        password: "password1",
        id_hotel: 1,
      },
    });

    const updatedUser = await userRepository.update(createdUser.id, {
      id: 1,
      email: "john.smith@example.com",
      password: "password2",
      id_hotel: 1,
    });

    expect(updatedUser).toEqual({
      ...createdUser,
      id: 1,
      email: "john.smith@example.com",
      password: "password2",
      id_hotel: 1,
    });
  });
});
