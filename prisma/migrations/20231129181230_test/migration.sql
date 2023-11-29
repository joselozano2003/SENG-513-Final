-- CreateTable
CREATE TABLE "triviaGame" (
    "id" SERIAL NOT NULL,
    "state" INTEGER NOT NULL,
    "playerLimit" INTEGER NOT NULL,
    "admin" TEXT NOT NULL,

    CONSTRAINT "triviaGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triviaGamePlayer" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "triviaGamePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triviaQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "triviaQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triviaQuestionChoice" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "choice" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "triviaQuestionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_triviaGameTotriviaQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_triviaGameTotriviaQuestion_AB_unique" ON "_triviaGameTotriviaQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_triviaGameTotriviaQuestion_B_index" ON "_triviaGameTotriviaQuestion"("B");

-- AddForeignKey
ALTER TABLE "triviaGamePlayer" ADD CONSTRAINT "triviaGamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "triviaGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triviaQuestionChoice" ADD CONSTRAINT "triviaQuestionChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "triviaQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_triviaGameTotriviaQuestion" ADD CONSTRAINT "_triviaGameTotriviaQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "triviaGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_triviaGameTotriviaQuestion" ADD CONSTRAINT "_triviaGameTotriviaQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "triviaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
