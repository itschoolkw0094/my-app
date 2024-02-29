-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "date" TIMESTAMP(3),
    "title" TEXT,
    "content" TEXT,
    "article_url" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "title" TEXT,
    "content" TEXT,
    "type" BOOLEAN NOT NULL DEFAULT false,
    "goodCount" INTEGER NOT NULL DEFAULT 0,
    "badCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gooded_comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_baded_comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_gooded_comments_AB_unique" ON "_gooded_comments"("A", "B");

-- CreateIndex
CREATE INDEX "_gooded_comments_B_index" ON "_gooded_comments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_baded_comments_AB_unique" ON "_baded_comments"("A", "B");

-- CreateIndex
CREATE INDEX "_baded_comments_B_index" ON "_baded_comments"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gooded_comments" ADD CONSTRAINT "_gooded_comments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gooded_comments" ADD CONSTRAINT "_gooded_comments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_baded_comments" ADD CONSTRAINT "_baded_comments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_baded_comments" ADD CONSTRAINT "_baded_comments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
