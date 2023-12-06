import React from 'react'
import Link from "next/link";
import GameTitle from "@/app/(games)/trivia-game/components/GameTitle";
import CoolButton from "@/app/(games)/trivia-game/components/CoolButton";

const VotePlayerPage = () => {

  return (
    <div className="text-white flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        <GameTitle title="Prompt Game" fontSize="text-4xl" />
      </div>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 1
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 2
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 3
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 4
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 5
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 6
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 7
      </CoolButton>
      <CoolButton
        href="/prompt-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        //onClick={handleConfirmAnswer}
      >
        Vote for Player 8
      </CoolButton>
    </div>
  );
};

export default VotePlayerPage;