import React from 'react'
import Link from "next/link";
import GameTitle from "@/app/(games)/trivia-game/components/GameTitle";
import CoolButton from "@/app/(games)/trivia-game/components/CoolButton";

const CahPlayerPage = () => {

  return (
    <div className="text-white flex flex-col items-center justify-center h-full bg-black">
      <div className="mb-8">
        <GameTitle title="Prompt Game" fontSize="text-4xl" />
      </div>
      <div className="mb-4">
        <label htmlFor="answer" className="block text-lg font-bold mb-2">
          Your Answer:
        </label>
        <input
          type="text"
          id="answer"
          name="answer"
          className="border-2 border-white rounded-md p-2 text-black"
        />
      </div>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Confirm Answer
      </CoolButton>
    </div>
  );
};

export default CahPlayerPage;