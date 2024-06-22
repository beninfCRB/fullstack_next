/*
  Warnings:

  - A unique constraint covering the columns `[productModelId]` on the table `price` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `price_productModelId_key` ON `price`(`productModelId`);
