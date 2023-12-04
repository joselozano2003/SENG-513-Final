import Image from "next/image";
import Link from "next/link";

import { cookies } from 'next/headers'
import AuthButton from "@/components/AuthButton";


export default function Home() {

    return (
        <div className="flex-1 w-full flex flex-col items-center">
            <h1>Hello</h1>
            <br></br>
            {/* 55555 is just a placeholder for a game session ID */}
            <Link className="block hover:underline dark:text-blue-500" href="/memory-game/55555/lobby">
                Memory game lobby
            </Link>
            {/* links to the gameplay for each game wont be on the catalogue screen, just here for development purposes */}
            <Link className="block hover:underline dark:text-blue-500" href="/memory-game/55555/game">
                Memory game gameplay
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game">
                New Trivia game
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/lobby">
                Trivia game lobby
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/intro">
                Trivia game intro
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/game">
                Trivia game gameplay
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/end">
                Trivia game end page
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game-player/55555/player-choose">
                Trivia player interface
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game-player/55555/player-wait">
                Trivia player waiting
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game/55555/lobby">
                Prompt game lobby
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game/55555/intro">
                Prompt game intro
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game/55555/game">
                Prompt game gameplay
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game/55555/end">
                Prompt game end page
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game-player/55555/player-choose">
                prompt game interface
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/prompt-game-player/55555/player-wait">
                prompt game waiting
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game-player">
                Join page
            </Link>
        </div>
    );
}
