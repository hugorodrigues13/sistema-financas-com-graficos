/*
  Warnings:

  - You are about to drop the column `frenquency` on the `lists` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lists" DROP COLUMN "frenquency",
ADD COLUMN     "frequency" "Frequency" NOT NULL;
