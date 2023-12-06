interface JoinStuffProps {
    id: string;
}

export default function JoinStuff({ id }: JoinStuffProps) {
    const joinCode = id;
    const joinLink = "http://localhost:3000/trivia-game-player";

    return (
        <div className="flex flex-col justify-center items-center w-fit">
            <div className="font-bold">Join the game at link:</div>
            <div className="text-blue-500 underline text-xl mb-4 mt-2">{joinLink}</div>
            <div className="p-3 text-white bg-blue-500 bg-opacity-50 font-bold rounded-full w-fit">Join code: {joinCode}</div>
        </div>
    );
}
