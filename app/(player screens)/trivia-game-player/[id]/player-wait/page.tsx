import React from 'react'
import Link from "next/link";


interface Props {
	params: {
		id: string;
  	};	
}

function WaitingPage({ params }: Props) {

	const gameId = params.id;

	return (
		<div className={`flex flex-col justify-center items-center text-4xl font-bold text-white [&>*]:m-5`}>
			<h1>You joined game {gameId}</h1>
			<h1 className="text-4xl font-bold text-white">Please look at the big screen</h1>
		</div>
	);
};

export default WaitingPage;