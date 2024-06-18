-- AlterTable
ALTER TABLE "User" ADD COLUMN     "charge_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "charge_time" TEXT NOT NULL DEFAULT '08:00';
