-- DropForeignKey
ALTER TABLE "habit_checkins" DROP CONSTRAINT "habit_checkins_habit_id_fkey";

-- AddForeignKey
ALTER TABLE "habit_checkins" ADD CONSTRAINT "habit_checkins_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
