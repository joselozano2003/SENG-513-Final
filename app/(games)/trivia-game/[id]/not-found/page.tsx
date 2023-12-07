import Link from "next/link";

interface Props {
    params: {
      id: string;
    };
}

// This is the page that is shown when the game is not found and prompts the user to go back to the main menu
export default async function NotFound({ params }: Props){

    const { id } = params // get the game id from the params



    return (
        <div className="w-[100vw] text-white text-center">
            <ButtonBack />
            <h1>Game {id} Not Found</h1>
        </div>
    )
}

// UI button to go back to the main menu
function ButtonBack() {
    return(
        <Link
        href="/"
        className="absolute left-8 top-20 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      	>
			<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
			>
			<polyline points="15 18 9 12 15 6" />
			</svg>{' '}
			Back
      </Link>
    )
}