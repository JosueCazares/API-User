/*
  Warnings:

  - Added the required column `universidad` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `libro` ADD COLUMN `universidad` VARCHAR(191) NOT NULL;
