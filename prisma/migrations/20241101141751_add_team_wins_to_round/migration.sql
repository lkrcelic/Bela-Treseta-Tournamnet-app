-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "team1_wins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "team2_wins" INTEGER NOT NULL DEFAULT 0;
