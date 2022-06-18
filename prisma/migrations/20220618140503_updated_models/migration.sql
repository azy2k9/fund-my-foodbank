/*
  Warnings:

  - Made the column `userId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `location` to the `Foodbank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Foodbank" ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "stripe_account_id" DROP NOT NULL,
ALTER COLUMN "twitter_handle" DROP NOT NULL,
ALTER COLUMN "facebook_page" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
