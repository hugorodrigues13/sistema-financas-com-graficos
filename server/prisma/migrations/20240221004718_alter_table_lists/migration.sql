/*
  Warnings:

  - You are about to drop the `lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "lists";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "entry-balance" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entry-balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exit-balance" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exit-balance_pkey" PRIMARY KEY ("id")
);
