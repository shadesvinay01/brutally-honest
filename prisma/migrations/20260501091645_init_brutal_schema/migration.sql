-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Roast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "tag" TEXT,
    "roastHeadline" TEXT NOT NULL,
    "painScore" INTEGER NOT NULL,
    "truthScore" INTEGER NOT NULL,
    "hypeGap" INTEGER NOT NULL,
    "roastLines" TEXT NOT NULL,
    "uxVerdict" TEXT NOT NULL,
    "trustVerdict" TEXT NOT NULL,
    "bestFeature" TEXT NOT NULL,
    "worstFeature" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "badge" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roastId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Comment_roastId_fkey" FOREIGN KEY ("roastId") REFERENCES "Roast" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roastId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Reaction_roastId_fkey" FOREIGN KEY ("roastId") REFERENCES "Roast" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roast_url_key" ON "Roast"("url");
