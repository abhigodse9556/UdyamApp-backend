-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mobile" SET DATA TYPE TEXT;
