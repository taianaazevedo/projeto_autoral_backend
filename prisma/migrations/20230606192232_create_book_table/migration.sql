/*
  Warnings:

  - Added the required column `streaming` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streaming` to the `Serie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performer` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "streaming" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Serie" ADD COLUMN     "streaming" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "performer" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "theme_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
