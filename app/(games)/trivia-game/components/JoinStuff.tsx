import Link from "next/link";
import React from "react";

export default function JoinStuff() {
    const joinLobbyLink = "/join-lobby";
    const joinCode = "4398";

    return (
        <div className="flex flex-row justify-center items-center w-fit">
            <Link href={joinLobbyLink}>
                <p className="text-blue-500 underline mr-10 hover:text-blue-700 transition-colors duration-300">Join the lobby here</p>
            </Link>
            <div className="p-3 text-white bg-blue-500 bg-opacity-50 font-bold rounded-full w-fit">Join code: {joinCode}</div>
        </div>
    );
}
