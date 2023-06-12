import { PrismaClient, Booking } from "@prisma/client";
import { BookingRepository } from "./booking.repository";

const prisma = new PrismaClient();

describe("BookingRepository", () => {
  let bookingRepository: BookingRepository;

  beforeAll(() => {
    bookingRepository = new BookingRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.booking.deleteMany();
  });

  test("findAll should return an array of bookings for a given hotel id", async () => {
    const hotelId = 1;
    const bookingsToCreate: Booking[] = [
      {
        id: 1,
        checkin: new Date("2023-06-10"),
        checkout: new Date("2023-06-15"),
        id_hotel: hotelId,
        id_room: 1,
        id_client: 1,
      },
      {
        id: 2,
        checkin: new Date("2023-06-20"),
        checkout: new Date("2023-06-25"),
        id_hotel: hotelId,
        id_room: 2,
        id_client: 2,
      },
    ];

    for (const booking of bookingsToCreate) {
      await prisma.booking.create({ data: booking });
    }

    const bookings = await bookingRepository.findAll(hotelId);

    expect(bookings).toHaveLength(2);
    expect(bookings[0].checkin).toEqual(new Date("2023-06-10"));
    expect(bookings[0].checkout).toEqual(new Date("2023-06-15"));
    expect(bookings[0].id_hotel).toBe(hotelId);
    expect(bookings[0].id_room).toBe(1);
    expect(bookings[0].id_client).toBe(1);

    expect(bookings[1].checkin).toEqual(new Date("2023-06-20"));
    expect(bookings[1].checkout).toEqual(new Date("2023-06-25"));
    expect(bookings[1].id_hotel).toBe(hotelId);
    expect(bookings[1].id_room).toBe(2);
    expect(bookings[1].id_client).toBe(2);
  });

  test("create should create a new booking for a given hotel id", async () => {
    const hotelId = 1;
    const newBooking: Booking = {
      id: 1,
      checkin: new Date("2023-06-10"),
      checkout: new Date("2023-06-15"),
      id_hotel: hotelId,
      id_room: 1,
      id_client: 1,
    };

    const createdBooking = await bookingRepository.create(
      newBooking,
      hotelId,
      newBooking.id_room,
      newBooking.id_client
    );

    expect(createdBooking.id).toBeDefined();
    expect(createdBooking.checkin).toEqual(new Date("2023-06-10"));
    expect(createdBooking.checkout).toEqual(new Date("2023-06-15"));
    expect(createdBooking.id_hotel).toBe(hotelId);
    expect(createdBooking.id_room).toBe(1);
    expect(createdBooking.id_client).toBe(1);
  });

  test("delete should delete a booking by id", async () => {
    const createdBooking = await prisma.booking.create({
      data: {
        id: 1,
        checkin: new Date("2023-06-10"),
        checkout: new Date("2023-06-15"),
        id_hotel: 1,
        id_room: 1,
        id_client: 1,
      },
    });

    const deleted = await bookingRepository.delete(createdBooking.id);

    expect(deleted).toBe(true);

    const booking = await prisma.booking.findUnique({
      where: { id: createdBooking.id },
    });

    expect(booking).toBeNull();
  });

  test("update should update a booking by id", async () => {
    const createdBooking = await prisma.booking.create({
      data: {
        id: 1,
        checkin: new Date("2023-06-10"),
        checkout: new Date("2023-06-15"),
        id_hotel: 1,
        id_room: 1,
        id_client: 1,
      },
    });

    const updatedBooking = await bookingRepository.update(createdBooking.id, {
        id: 1,
        checkin: new Date("2023-06-15"),
        checkout: new Date("2023-06-20"),
        id_hotel: 1,
        id_room: 1,
        id_client: 1,
    });

    expect(updatedBooking).toEqual({
      ...createdBooking,
      checkin: new Date("2023-06-15"),
      checkout: new Date("2023-06-20"),
    });
  });
});
