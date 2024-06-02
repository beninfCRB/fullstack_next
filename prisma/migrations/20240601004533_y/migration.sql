/*
  Warnings:

  - Made the column `machineSerial` on table `model_machine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `model_machine` MODIFY `machineSerial` VARCHAR(191) NOT NULL;
