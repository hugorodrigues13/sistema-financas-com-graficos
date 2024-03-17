-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('Recorrente', 'Eventual');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Saida', 'Entrada');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frenquency" "Frequency" NOT NULL,
    "type" "Type" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);
