"use client";

import React from "react";
import styles from "../[id]/game/styles.module.css";

// components
import QuestionTimer from "./QuestionTimer";

export default function QandA() {
    // get these from the database later
    const question = "What is the capital of France?";
    const answers = ["Paris", "London", "Berlin", "Madrid", "Another One"];
    const answerLetters = ["A", "B", "C", "D", "E"];
    const boxShadows = ["blue", "purple", "red", "green", "orange"];

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-full pt-5">
                <div className="flex justify-center items-center w-3/5">
                    <h1 className="text-6xl font-bold text-center w-4/5 bg-blue-300 bg-opacity-50 py-5 rounded-xl" style={{ textShadow: "2px 2px 4px grey" }}>
                        {question}
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-start w-2/5">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center text-3xl w-1/2 mb-6 rounded-xl">
                            <div
                                className="mr-5 w-9 h-11 flex items-center justify-center"
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
            <div className="flex flex-col items-center">
                <p className="mb-2 text-2xl bg-green-600 bg-opacity-55 rounded-lg p-2 font-bold">Time's Up!</p>
                <div className="w-3/4 h-fit">
                    <div id="question-timer" className={`bg-blue-600 h-6 ${styles.progressBar}`}></div>
                </div>
            </div>
        </div>
    );
}
