/*
  Warnings:

  - You are about to drop the column `userId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_userId_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "userId",
ADD COLUMN     "debtorId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "Debtor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT,

    CONSTRAINT "Debtor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Debtor_phone_key" ON "Debtor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Debtor_email_key" ON "Debtor"("email");

-- AddForeignKey
ALTER TABLE "Debtor" ADD CONSTRAINT "Debtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Debtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
