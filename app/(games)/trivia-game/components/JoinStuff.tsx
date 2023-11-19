import Link from "next/link";
import React from "react";

export default function JoinStuff() {

    return (
        <div className="flex flex-row justify-center items-center w-fit">
            <Link href="/join-lobby">
                <p className="text-blue-500 underline mr-10 hover:text-blue-700 transition-colors duration-300">Join the lobby here</p>
            </Link>
            <div
                className="p-3 text-white bg-blue-500 bg-opacity-50 font-bold rounded-full w-fit"
                // style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 0% 30%)" }}
            >
                Join code: 4398
            </div>
        </div>
    );
}
