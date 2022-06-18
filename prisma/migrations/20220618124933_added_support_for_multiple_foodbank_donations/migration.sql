/*
  Warnings:

  - You are about to drop the column `foodbankId` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `total` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_foodbankId_fkey";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "foodbankId",
ADD COLUMN     "total" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_DonationToFoodbank" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DonationToFoodbank_AB_unique" ON "_DonationToFoodbank"("A", "B");

-- CreateIndex
CREATE INDEX "_DonationToFoodbank_B_index" ON "_DonationToFoodbank"("B");

-- AddForeignKey
ALTER TABLE "_DonationToFoodbank" ADD CONSTRAINT "_DonationToFoodbank_A_fkey" FOREIGN KEY ("A") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationToFoodbank" ADD CONSTRAINT "_DonationToFoodbank_B_fkey" FOREIGN KEY ("B") REFERENCES "Foodbank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
