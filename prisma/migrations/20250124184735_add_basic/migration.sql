/*
  Warnings:

  - You are about to drop the column `pasaword` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pasaword",
ADD COLUMN     "password" TEXT;
