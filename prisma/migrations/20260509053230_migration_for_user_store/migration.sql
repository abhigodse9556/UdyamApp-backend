-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeShortName" TEXT,
    "phone" TEXT NOT NULL,
    "businessWhatsapp" TEXT,
    "businessEmail" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "pincode" INTEGER,
    "gstin" TEXT,
    "licence" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "mobile" BIGINT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_phone_key" ON "Store"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Store_businessWhatsapp_key" ON "Store"("businessWhatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
