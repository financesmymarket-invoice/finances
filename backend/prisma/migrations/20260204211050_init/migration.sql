-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PriceSource" AS ENUM ('AUTO', 'MANUAL');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('PIECE', 'BOX');

-- CreateEnum
CREATE TYPE "AgentInvoiceFormat" AS ENUM ('STANDARD', 'BOX_IN_QTY', 'CUSTOM_4');

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "markupPercent" INTEGER NOT NULL,
    "format" "AgentInvoiceFormat",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "agentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "type" "InvoiceType" NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "markupPercent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "productId" INTEGER,
    "productName" TEXT NOT NULL,
    "unitType" "UnitType" NOT NULL,
    "boxSize" INTEGER,
    "quantity" INTEGER NOT NULL,
    "boxesCount" INTEGER,
    "purchasePrice" BIGINT NOT NULL,
    "purchasePricePerUnit" BIGINT,
    "calculatedPrice" BIGINT NOT NULL,
    "roundedPrice" BIGINT NOT NULL,
    "priceChanged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawInvoiceItem" (
    "id" SERIAL NOT NULL,
    "invoicePhotoId" INTEGER NOT NULL,
    "rowIndex" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "rawQuantity" TEXT,
    "rawUnitPrice" TEXT,
    "rawAmount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPriceMemory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "purchasePrice" BIGINT NOT NULL,
    "salePrice" BIGINT NOT NULL,
    "source" "PriceSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductPriceMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicePhoto" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvoicePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_name_key" ON "Agent"("name");

-- CreateIndex
CREATE INDEX "Product_agentId_idx" ON "Product"("agentId");

-- CreateIndex
CREATE INDEX "Invoice_agentId_idx" ON "Invoice"("agentId");

-- CreateIndex
CREATE INDEX "Invoice_invoiceDate_idx" ON "Invoice"("invoiceDate");

-- CreateIndex
CREATE INDEX "Invoice_type_invoiceDate_idx" ON "Invoice"("type", "invoiceDate");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPriceMemory_productId_agentId_purchasePrice_key" ON "ProductPriceMemory"("productId", "agentId", "purchasePrice");

-- CreateIndex
CREATE INDEX "InvoicePhoto_invoiceId_idx" ON "InvoicePhoto"("invoiceId");

-- CreateIndex
CREATE INDEX "InvoicePhoto_processed_idx" ON "InvoicePhoto"("processed");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawInvoiceItem" ADD CONSTRAINT "RawInvoiceItem_invoicePhotoId_fkey" FOREIGN KEY ("invoicePhotoId") REFERENCES "InvoicePhoto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPriceMemory" ADD CONSTRAINT "ProductPriceMemory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPriceMemory" ADD CONSTRAINT "ProductPriceMemory_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicePhoto" ADD CONSTRAINT "InvoicePhoto_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
