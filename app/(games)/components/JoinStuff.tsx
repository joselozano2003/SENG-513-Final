interface JoinStuffProps {
    id: string;
}

export default function JoinStuff({ id }: JoinStuffProps) {
    const joinCode = id;
    const joinLink = "http://localhost:3000/trivia-game-player";

    return (
        <div className="flex flex-col text-xl justify-center items-center w-fit">
            <div className="font-bold" style={{ textShadow: "1px 1px black" }}>
                Join the game at link:
            </div>
            <div className="text-blue-600 underline mb-6 mt-2">{joinLink}</div>
            <div className="p-3 text-white bg-blue-500 bg-opacity-70 font-bold rounded-full w-fit" style={{ textShadow: "1px 1px black" }}>
                Join code: {joinCode}
            </div>
        </div>
    );
}
