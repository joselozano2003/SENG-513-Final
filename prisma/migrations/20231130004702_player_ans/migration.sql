/*
  Warnings:

  - Added the required column `playerNumber` to the `triviaGamePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "triviaGamePlayer" ADD COLUMN     "playerNumber" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "triviaPlayerAnswer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "choiceId" INTEGER NOT NULL,

    CONSTRAINT "triviaPlayerAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "triviaPlayerAnswer" ADD CONSTRAINT "triviaPlayerAnswer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "triviaGamePlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triviaPlayerAnswer" ADD CONSTRAINT "triviaPlayerAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "triviaQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triviaPlayerAnswer" ADD CONSTRAINT "triviaPlayerAnswer_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "triviaQuestionChoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
