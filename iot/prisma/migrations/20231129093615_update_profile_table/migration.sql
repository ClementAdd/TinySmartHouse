/*
  Warnings:

  - You are about to drop the column `loginId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_loginId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "loginId";
