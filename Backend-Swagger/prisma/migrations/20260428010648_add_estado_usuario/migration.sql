/*
  Warnings:

  - You are about to drop the column `estado` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "estado",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;
