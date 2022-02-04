-- CreateTable
CREATE TABLE "Blogpost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT
);
