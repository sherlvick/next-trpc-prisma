/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "image" BYTEA,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
