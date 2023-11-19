import React from 'react'
import Link from "next/link";

// assets
import blackBrickBackground from "public/black-brick-wall-textured-background.jpg";

// components
import NeonButton from "../../components/NeonButton";
import GameTitle from '@/app/(games)/trivia-game/components/GameTitle';

const MobilePlayerPage = () => {

  const bgStyling = {
    backgroundImage: `url(${blackBrickBackground.src})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "7vh 5vw",
  };

    return (
      <div className={`h-screen bg-cover`} style={bgStyling}>
        <div>
          <GameTitle title="Trivia Game" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <NeonButton href="trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="blue" padding="py-4 px-2 mb-4">
            Answer 1
          </NeonButton>
          <NeonButton href="trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="red" padding="py-4 px-2 mb-4">
            Answer 2
          </NeonButton>
          <NeonButton href="trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="green" padding="py-4 px-2 mb-4">
            Answer 3
          </NeonButton>
          <NeonButton href="/trivia-game-player/55555/player-wait" textSize="text-lg" borderColor="yellow" padding="py-4 px-2 mb-4">
            Answer 4
          </NeonButton>
        </div>
      </div>
    );
  };
  
  export default MobilePlayerPage;

