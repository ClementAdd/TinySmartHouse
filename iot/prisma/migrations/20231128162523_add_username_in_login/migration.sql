/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Login` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Login_username_key" ON "Login"("username");
