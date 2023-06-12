/*
  Warnings:

  - You are about to drop the column `Role` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date_birth" DATETIME NOT NULL,
    "date_hiring" DATETIME NOT NULL,
    "salary" REAL NOT NULL,
    "role" TEXT NOT NULL,
    "id_user" INTEGER,
    "id_hotel" INTEGER NOT NULL,
    CONSTRAINT "Employee_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("date_birth", "date_hiring", "id", "id_hotel", "id_user", "name", "salary") SELECT "date_birth", "date_hiring", "id", "id_hotel", "id_user", "name", "salary" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_id_user_key" ON "Employee"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
