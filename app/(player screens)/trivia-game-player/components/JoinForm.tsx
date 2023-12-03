"use client";

import GameTitle from "@/app/(games)/trivia-game/components/GameTitle";
import JoinButton from "./JoinButton";
import { useEffect, useState } from "react";

export default function JoinForm({  }) {
    const [userName, setUserName] = useState('');
    const [gameCode, setGameCode] = useState('');
    const [isButtonVisible, setButtonVisible] = useState(false);

    // error-proofing: hide join button unless all fields filled in
    useEffect(() => {
        if (userName !== '' && gameCode !== '') {
            setButtonVisible(true);
        } else {
            setButtonVisible(false);
        }
        // console.log(userName);
        // console.log(gameCode);
    }, [userName, gameCode])


    const JoinGamePage = async () => {
        
        console.log("clicked!");
        console.log(userName);
        console.log(gameCode);

        // handle existence of gamecode here
        // handle limit of players here

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
          onChange={(e) => {setUserName(e.target.value)}}
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
          onChange={(e) => {setGameCode(e.target.value)}}
        />
      </div>
      {isButtonVisible && (<JoinButton
        href ="/trivia-game-player/55555/player-wait"
        textSize="text-lg"
        hoverScale="hover:scale-100"
        padding="py-2 px-4"
        onClick={JoinGamePage}>
        Join
      </JoinButton>)}
      </div>

    );
}