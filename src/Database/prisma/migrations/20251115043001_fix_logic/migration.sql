/*
  Warnings:

  - You are about to drop the column `tenantId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the `AdminAccessLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientTenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImpersonationLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformAdminLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ClientTenant" DROP CONSTRAINT "ClientTenant_clientConfigId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClientTenant" DROP CONSTRAINT "ClientTenant_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Folder" DROP CONSTRAINT "Folder_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlatformAdminLog" DROP CONSTRAINT "PlatformAdminLog_planId_fkey";

-- DropIndex
DROP INDEX "public"."File_createdAt_idx";

-- DropIndex
DROP INDEX "public"."UserSession_ipAddress_idx";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "tenantId",
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."AdminAccessLog";

-- DropTable
DROP TABLE "public"."ClientConfig";

-- DropTable
DROP TABLE "public"."ClientTenant";

-- DropTable
DROP TABLE "public"."ImpersonationLog";

-- DropTable
DROP TABLE "public"."Plan";

-- DropTable
DROP TABLE "public"."PlatformAdmin";

-- DropTable
DROP TABLE "public"."PlatformAdminLog";

-- DropEnum
DROP TYPE "public"."TenantStatus";

-- CreateTable
CREATE TABLE "ActionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityId" TEXT,
    "entityType" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActionLog_pkey" PRIMARY KEY ("id")
);
