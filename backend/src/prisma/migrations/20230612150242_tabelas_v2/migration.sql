/*
  Warnings:

  - You are about to drop the column `capactity` on the `RoomType` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "RoomType_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RoomType" ("description", "id", "id_hotel", "name", "price") SELECT "description", "id", "id_hotel", "name", "price" FROM "RoomType";
DROP TABLE "RoomType";
ALTER TABLE "new_RoomType" RENAME TO "RoomType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
