import Link from "next/link";
import React from "react";

export default function JoinStuff() {
    return (
        <div className="flex flex-row justify-center items-center w-fit mx-auto mt-12 text-xl p-7 bg-gray-100 bg-opacity-5 rounded-full">
            <Link href="/join-lobby">
                <p className="text-blue-500 underline mr-10 hover:text-blue-700 transition-colors duration-300">Join the lobby here</p>
            </Link>
            <div className="border p-2 rounded text-white bg-blue-500 font-bold">Join code: 4398</div>
        </div>
    );
}
