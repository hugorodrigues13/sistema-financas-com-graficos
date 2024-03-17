/*
  Warnings:

  - Changed the type of `date` on the `entry-balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "entry-balance" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
