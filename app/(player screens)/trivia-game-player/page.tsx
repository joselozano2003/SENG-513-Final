import React from "react";
import GameTitle from "../../(games)/trivia-game/components/GameTitle";
import CoolButton from "../../(games)/trivia-game/components/CoolButton";

const JoinGamePage = () => {
  const handleJoinGame = () => {
    // Add logic for joining the game based on username and game code
    console.log("Joining the game...");
  };

  return (
    <div className="text-white flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        <GameTitle title="Party Game" fontSize="text-6xl" />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-lg font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="border-2 border-white rounded-md p-2 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gameCode" className="block text-lg font-bold mb-2">
          Game Code:
        </label>
        <input
          type="text"
          id="gameCode"
          name="gameCode"
          className="border-2 border-white rounded-md p-2 text-black"
        />
      </div>
      <CoolButton
        href ="/trivia-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
      >
        Join
      </CoolButton>
    </div>
  );
};

export default JoinGamePage;