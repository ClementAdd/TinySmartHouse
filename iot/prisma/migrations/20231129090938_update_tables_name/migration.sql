/*
  Warnings:

  - You are about to drop the column `userId` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Login` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_loginId_fkey";

-- DropIndex
DROP INDEX "Login_userId_key";

-- AlterTable
ALTER TABLE "Login" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "loginId" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_loginId_key" ON "Profile"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "Login_profileId_key" ON "Login"("profileId");

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
