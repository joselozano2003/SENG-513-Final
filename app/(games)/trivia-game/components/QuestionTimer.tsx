"use client";

// maybe not needed anymore

import React, { useState } from "react";
import TempButton from "./TempButton";
import styles from "../[id]/game/styles.module.css";

export default function ProgressBarWithButton() {
    const pBarHeight = "h-6";
    const [key, setKey] = useState(0);

    const handleClick = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="w-full h-fit">
            <p className="self-center">Time's Up!</p>
            <div>
                <div key={key} className={`bg-blue-600 ${pBarHeight} ${styles.progressBar}`}></div>
            </div>
            {/* <TempButton onClick={handleClick} /> */}
        </div>
    );
}
