"use client";

import React from "react";

// components
import CircularTimer from "./CircularTimer";

export default function QandA() {
    // get these from the database later
    const question = "What is the capital of France?";
    const answers = ["Paris", "London", "Berlin", "Madrid", "Another One"];
    const answerLetters = ["A", "B", "C", "D", "E"];
    const boxShadows = ["blue", "purple", "red", "green", "orange"];

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-full pt-20">
                <div className="flex flex-col justify-center items-center w-3/5">
                    <h1
                        className="text-6xl font-bold text-center w-4/5 bg-opacity-50 py-5 rounded-xl"
                        style={{ textShadow: "2px 2px 4px grey" }}
                    >
                        {question}
                    </h1>
                    <CircularTimer />
                </div>
                <div className="flex flex-col justify-center items-start w-2/5">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center text-3xl mb-10 rounded-xl">
                            <div
                                className="mr-5 w-9 h-11 max-w-9 max-h-11 flex items-center justify-center"
                                style={{
                                    backgroundColor: boxShadows[index],
                                    // border: `2px solid ${boxShadows[index]}`,
                                    boxShadow: `0 0 3px 4px ${boxShadows[index]}`,
                                }}
                            >
                                {answerLetters[index]}
                            </div>
                            {answer}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
