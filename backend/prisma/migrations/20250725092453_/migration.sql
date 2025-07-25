/*
  Warnings:

  - Added the required column `image` to the `badges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "badges" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "habit_checkins" ALTER COLUMN "completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "habits" ADD COLUMN     "time" TEXT NOT NULL DEFAULT '08:00';
