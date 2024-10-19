/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `storeId` on the `StaffAssignment` table. All the data in the column will be lost.
  - Added the required column `address` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_tag` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_phone_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Store";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Owner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_tag" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "detail_address" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "theme_color" TEXT,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Owner" ("created_at", "id", "updated_at", "userId") SELECT "created_at", "id", "updated_at", "userId" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
CREATE UNIQUE INDEX "Owner_phone_key" ON "Owner"("phone");
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");
CREATE TABLE "new_StaffAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffId" INTEGER NOT NULL,
    "hourly_wage" REAL NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "ownerId" INTEGER,
    CONSTRAINT "StaffAssignment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StaffAssignment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_StaffAssignment" ("created_at", "hourly_wage", "id", "role", "staffId", "status", "updated_at") SELECT "created_at", "hourly_wage", "id", "role", "staffId", "status", "updated_at" FROM "StaffAssignment";
DROP TABLE "StaffAssignment";
ALTER TABLE "new_StaffAssignment" RENAME TO "StaffAssignment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
