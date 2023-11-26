import React from "react";
import CoolButton from "@/app/(games)/trivia-game/components/CoolButton";

const WinnerIcon = () => (
  <div className="text-4xl text-yellow-500">🏆</div>
);

const EndingScreen = () => {
  return (
    <div className={`text-white flex flex-col items-center h-full justify-center`}>
      <div className="mb-4">
        <WinnerIcon />
      </div>
      <div className="text-4xl font-bold mb-4">
        Congratulations! Player 1 is the winner!
      </div>
      <div className="text-lg mb-4">
        <p>Credits:</p>
        <p>Developed by SENG 513 group 16</p>
      </div>
      <CoolButton href="/trivia-game/55555/lobby" textSize="text-sm" hoverScale="hover:scale-100" padding="py-2 px-2">
        Return to Main Menu
      </CoolButton>
    </div>
  );
};

export default EndingScreen;