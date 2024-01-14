/*
  Warnings:

  - You are about to drop the column `profileId` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Login" DROP CONSTRAINT "Login_profileId_fkey";

-- DropIndex
DROP INDEX "Login_profileId_key";

-- AlterTable
ALTER TABLE "Login" DROP COLUMN "profileId",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Profile";
