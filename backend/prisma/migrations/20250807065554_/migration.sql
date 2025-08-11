/*
  Warnings:

  - Added the required column `expression` to the `habits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habit_checkins" ALTER COLUMN "checkin_datetime" DROP DEFAULT;

-- AlterTable
ALTER TABLE "habits" ADD COLUMN     "expression" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "habits_frequency_idx" ON "habits"("frequency");
