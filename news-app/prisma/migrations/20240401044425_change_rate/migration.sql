/*
  Warnings:

  - You are about to drop the `Bad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Good` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bad" DROP CONSTRAINT "Bad_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Bad" DROP CONSTRAINT "Bad_userId_fkey";

-- DropForeignKey
ALTER TABLE "Good" DROP CONSTRAINT "Good_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Good" DROP CONSTRAINT "Good_userId_fkey";

-- DropTable
DROP TABLE "Bad";

-- DropTable
DROP TABLE "Good";

-- CreateTable
CREATE TABLE "RateForComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "type" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3),

    CONSTRAINT "RateForComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RateForComment_userId_commentId_key" ON "RateForComment"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "RateForComment" ADD CONSTRAINT "RateForComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateForComment" ADD CONSTRAINT "RateForComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
