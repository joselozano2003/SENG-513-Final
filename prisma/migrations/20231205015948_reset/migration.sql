/*
  Warnings:

  - Added the required column `currentQuestion` to the `triviaGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `triviaPlayerAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameRound` to the `triviaPlayerAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "triviaGame" ADD COLUMN     "currentQuestion" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "triviaPlayerAnswer" ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "gameRound" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "triviaPlayerAnswer" ADD CONSTRAINT "triviaPlayerAnswer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "triviaGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
