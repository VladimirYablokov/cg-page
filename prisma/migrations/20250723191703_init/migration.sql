/*
  Warnings:

  - You are about to drop the column `authorName` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `productivityRating` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `NoteDay` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `authorId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorName",
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "productivityRating",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "NoteDay";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
