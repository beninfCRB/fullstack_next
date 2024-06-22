/*
  Warnings:

  - You are about to alter the column `price` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(16,2)`.
  - You are about to alter the column `dp` on the `price` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(16,2)`.
  - You are about to alter the column `amount` on the `price_detail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(16,2)`.

*/
-- AlterTable
ALTER TABLE `price` MODIFY `price` DECIMAL(16, 2) NOT NULL DEFAULT 0,
    MODIFY `dp` DECIMAL(16, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `price_detail` MODIFY `amount` DECIMAL(16, 2) NOT NULL DEFAULT 0;
