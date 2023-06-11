-- CreateTable
CREATE TABLE "Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "stars" REAL NOT NULL,
    "checkin" DATETIME NOT NULL,
    "checkout" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "User_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capactity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "RoomType_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "id_room_type" INTEGER NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Room_id_room_type_fkey" FOREIGN KEY ("id_room_type") REFERENCES "RoomType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Room_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkin" DATETIME NOT NULL,
    "checkout" DATETIME NOT NULL,
    "id_room" INTEGER NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    CONSTRAINT "Booking_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Client_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Pub_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date_birth" DATETIME NOT NULL,
    "date_hiring" DATETIME NOT NULL,
    "salary" REAL NOT NULL,
    "Role" TEXT NOT NULL,
    "id_user" INTEGER,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Employee_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_user_key" ON "Employee"("id_user");
