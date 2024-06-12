/*
  Warnings:

  - You are about to drop the `productimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_productColorId_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_updatedBy_fkey`;

-- DropTable
DROP TABLE `productimage`;

-- CreateTable
CREATE TABLE `product_image` (
    `id` VARCHAR(191) NOT NULL,
    `productColorId` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productColorId_fkey` FOREIGN KEY (`productColorId`) REFERENCES `product_color`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
