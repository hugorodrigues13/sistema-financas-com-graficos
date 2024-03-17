/*
  Warnings:

  - Added the required column `date` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "date" TEXT NOT NULL;
