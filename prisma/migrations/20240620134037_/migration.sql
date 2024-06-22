-- CreateTable
CREATE TABLE `carousel_image` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carousel_image` ADD CONSTRAINT `carousel_image_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carousel_image` ADD CONSTRAINT `carousel_image_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
