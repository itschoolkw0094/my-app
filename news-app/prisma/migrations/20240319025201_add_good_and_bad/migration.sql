/*
  Warnings:

  - You are about to drop the `_baded_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_gooded_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_baded_comments" DROP CONSTRAINT "_baded_comments_A_fkey";

-- DropForeignKey
ALTER TABLE "_baded_comments" DROP CONSTRAINT "_baded_comments_B_fkey";

-- DropForeignKey
ALTER TABLE "_gooded_comments" DROP CONSTRAINT "_gooded_comments_A_fkey";

-- DropForeignKey
ALTER TABLE "_gooded_comments" DROP CONSTRAINT "_gooded_comments_B_fkey";

-- DropTable
DROP TABLE "_baded_comments";

-- DropTable
DROP TABLE "_gooded_comments";

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "date" TIMESTAMP(3),

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bad" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "date" TIMESTAMP(3),

    CONSTRAINT "Bad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Good_userId_commentId_key" ON "Good"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bad_userId_commentId_key" ON "Bad"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bad" ADD CONSTRAINT "Bad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bad" ADD CONSTRAINT "Bad_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
