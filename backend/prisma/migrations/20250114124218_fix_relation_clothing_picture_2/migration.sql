/*
  Warnings:

  - You are about to drop the column `clothingId` on the `Picture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_clothingId_fkey";

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "clothingId";
