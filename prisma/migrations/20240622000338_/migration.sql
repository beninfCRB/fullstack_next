/*
  Warnings:

  - You are about to drop the column `productId` on the `price` table. All the data in the column will be lost.
  - Added the required column `productModelId` to the `price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `price_productId_fkey`;

-- AlterTable
ALTER TABLE `price` DROP COLUMN `productId`,
    ADD COLUMN `productModelId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `price` ADD CONSTRAINT `price_productModelId_fkey` FOREIGN KEY (`productModelId`) REFERENCES `product_model`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
