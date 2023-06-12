/*
  Warnings:

  - Added the required column `name` to the `Pub` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Pub_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pub" ("id", "id_hotel") SELECT "id", "id_hotel" FROM "Pub";
DROP TABLE "Pub";
ALTER TABLE "new_Pub" RENAME TO "Pub";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
