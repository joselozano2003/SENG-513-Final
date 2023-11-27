
import React from "react";
import CoolButton from "@/app/(games)/trivia-game/components/CoolButton";
import Avatars from "@/app/(games)/trivia-game/components/Avatars";

const WinnerAvatar = () => (
  <Avatars
    gridLayout="columns"
    bg={false}
    gap="lobby"
    points={false}
  />
);

const EndingScreen = () => {
  return (
    <div className={`text-white flex flex-col items-center h-full justify-center`}>
      <div className="mb-4">
        <WinnerAvatar />
      </div>
      <div className="text-2xl font-bold mb-4">
        Congratulations! Player 1 is the winner!
      </div>
      <div className="text-lg mb-4">
        <p>Credits:</p>
        <p>Developed by SENG 513 group 16</p>
      </div>
      <CoolButton
        href="/prompt-game/55555/lobby"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
      >
        Return to Main Menu
      </CoolButton>
    </div>
  );
};

export default EndingScreen;