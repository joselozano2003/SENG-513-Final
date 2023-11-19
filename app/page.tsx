import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="p-5">
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
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/lobby">
                Trivia game lobby
            </Link>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game/55555/game">
                Trivia game gameplay
            </Link>
            <br></br>
            <Link className="block hover:underline dark:text-blue-500" href="/trivia-game-player/55555/player-choose">
                Trivia player interface
            </Link>
        </main>
    );
}
