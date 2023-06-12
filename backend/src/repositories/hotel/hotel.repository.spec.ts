import { PrismaClient, Hotel, Prisma } from "@prisma/client";
import { HotelRepository } from "./hotel.repository";

// Cria uma instância do PrismaClient
const prisma = new PrismaClient();

describe("HotelRepository", () => {
  let hotelRepository: HotelRepository;

  // Antes de cada teste, cria uma instância do HotelRepository
  beforeAll(() => {
    hotelRepository = new HotelRepository();
  });

  // Após todos os testes, desconecta do PrismaClient
  afterAll(async () => {
    await prisma.$disconnect();
  });

  Após cada teste, exclui todos os hotéis do banco de dados
  afterEach(async () => {
    await prisma.hotel.deleteMany();
  });

  test("findAll should return an array of hotels", async () => {
    // Crie alguns hotéis para testar
    const hotelsToCreate: Hotel[] = [
      {
        id: 1,
        name: "Hotel A",
        address: "Address A",
        phone: "Phone A",
        stars: 4,
        checkin: new Date("2023-06-11T12:00:00Z"),
        checkout: new Date("2023-06-11T11:00:00Z"),
      },
      {
        id: 2,
        name: "Hotel B",
        address: "Address B",
        phone: "Phone B",
        stars: 3,
        checkin: new Date("2023-06-11T14:00:00Z"),
        checkout: new Date("2023-06-11T10:00:00Z"),
      },
    ];

    // Cria os hotéis no banco de dados usando o Prisma
    for (const hotel of hotelsToCreate) {
      await prisma.hotel.create({ data: hotel });
    }

    // Chama a função findAll do HotelRepository
    const hotels = await hotelRepository.findAll();

    // Verifica se os hotéis foram retornados corretamente
    expect(hotels).toHaveLength(2);
    expect(hotels[0].name).toBe("Hotel A");
    expect(hotels[0].address).toBe("Address A");
    expect(hotels[0].phone).toBe("Phone A");
    expect(hotels[0].stars).toBe(4);
    expect(hotels[0].checkin).toEqual(new Date("2023-06-11T12:00:00Z"));
    expect(hotels[0].checkout).toEqual(new Date("2023-06-11T11:00:00Z"));

    expect(hotels[1].name).toBe("Hotel B");
    expect(hotels[1].address).toBe("Address B");
    expect(hotels[1].phone).toBe("Phone B");
    expect(hotels[1].stars).toBe(3);
    expect(hotels[1].checkin).toEqual(new Date("2023-06-11T14:00:00Z"));
    expect(hotels[1].checkout).toEqual(new Date("2023-06-11T10:00:00Z"));
  });

  test("create should create a new hotel", async () => {
    // Cria um novo hotel para ser inserido no banco de dados
    const newHotel: Hotel = {
      id: 1, // Adicione um valor para a propriedade 'id'
      name: "Hotel A",
      address: "Address A",
      phone: "Phone A",
      stars: 4,
      checkin: new Date("2023-06-11T12:00:00Z"),
      checkout: new Date("2023-06-11T11:00:00Z"),
    };

    // Chama a função create do HotelRepository para criar o novo hotel
    const createdHotel = await hotelRepository.create(newHotel);

    // Verifica se o hotel foi criado corretamente
    expect(createdHotel.id).toBeDefined();
    expect(createdHotel.name).toBe("Hotel A");
    expect(createdHotel.address).toBe("Address A");
    expect(createdHotel.phone).toBe("Phone A");
    expect(createdHotel.stars).toBe(4);
    expect(createdHotel.checkin).toEqual(new Date("2023-06-11T12:00:00Z"));
    expect(createdHotel.checkout).toEqual(new Date("2023-06-11T11:00:00Z"));
  });

  test("delete should delete a hotel by id", async () => {
    // Cria um hotel no banco de dados usando o Prisma
    const createdHotel = await prisma.hotel.create({
      data: {
        id: 1,
        name: "Hotel A",
        address: "Address A",
        phone: "Phone A",
        stars: 4,
        checkin: new Date("2023-06-11T12:00:00Z"),
        checkout: new Date("2023-06-11T12:00:00Z"),
      },
    });

    // Chama a função delete do HotelRepository para excluir o hotel pelo id
    const deleted = await hotelRepository.delete(createdHotel.id as number);

    // Verifica se o hotel foi excluído corretamente
    expect(deleted).toBe(true);

    // Verifica se o hotel não existe mais no banco de dados
    const hotel = await prisma.hotel.findUnique({
      where: { id: createdHotel.id as number },
    });

    expect(hotel).toBeNull();
  });

  test("update should update a hotel by id", async () => {
    // Cria um hotel no banco de dados usando o Prisma
    const createdHotel = await prisma.hotel.create({
      data: {
        id:1,
        name: "Hotel A",
        address: "Address A",
        phone: "Phone A",
        stars: 4,
        checkin: new Date("2023-06-11T12:00:00Z"),
        checkout: new Date("2023-06-11T12:00:00Z"),
      },
    });

    // Chama a função update do HotelRepository para atualizar o hotel pelo id
    const updatedHotel = await hotelRepository.update(createdHotel.id as number, {
      id: 1,
      name: "Updated Hotel A",
      address: "Updated Address A",
      phone: "Updated Phone A",
      stars: 3,
      checkin: new Date("2023-06-11T14:00:00Z"),
      checkout: new Date("2023-06-11T13:00:00Z"),
    });

    // Verifica se o hotel foi atualizado corretamente
    expect(updatedHotel).toEqual({
      ...createdHotel,
      name: "Updated Hotel A",
      address: "Updated Address A",
      phone: "Updated Phone A",
      stars: 3,
      checkin: new Date("2023-06-11T14:00:00Z"),
      checkout: new Date("2023-06-11T13:00:00Z"),
    });
  });
});
