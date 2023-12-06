interface JoinStuffProps {
    id: string;
}

export default function JoinStuff({ id }: JoinStuffProps) {
    const joinCode = id;

    return (
        <div className="flex flex-row justify-center items-center w-fit">
            <div className="p-3 text-white bg-blue-500 bg-opacity-50 font-bold rounded-full w-fit">Join code: {joinCode}</div>
        </div>
    );
}
