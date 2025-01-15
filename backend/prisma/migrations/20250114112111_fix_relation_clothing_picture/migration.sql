-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "clothingId" INTEGER;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
