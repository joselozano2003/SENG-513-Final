import React from 'react'
import Link from "next/link";

// assets
import blackBrickBackground from "public/black-brick-wall-textured-background.jpg";

// components
import NeonButton from "../../components/NeonButton";
import GameTitle from '@/app/(games)/trivia-game/components/GameTitle';

const MobilePlayerPage = () => {

    return (
      <div>
        <div className="mb-7">
        <GameTitle title="Trivia Game" fontSize="text-6xl" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="blue" padding="py-4 px-2 mb-8">
            Answer 1
          </NeonButton>
          <NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="purple" padding="py-4 px-2 mb-8">
            Answer 2
          </NeonButton>
          <NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="red" padding="py-4 px-2 mb-8">
            Answer 3
          </NeonButton>
          <NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="green" padding="py-4 px-2 mb-8">
            Answer 4
          </NeonButton>
        </div>
      </div>
    );
  };
  
  export default MobilePlayerPage;