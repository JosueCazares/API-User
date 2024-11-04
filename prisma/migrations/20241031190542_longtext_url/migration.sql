/*
  Warnings:

  - Made the column `url` on table `libro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `libro` MODIFY `url` LONGTEXT NOT NULL;
