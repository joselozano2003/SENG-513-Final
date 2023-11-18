'use client';

import React, { useState } from "react";
import styles from "./styles.module.css";
import TempButton from "../../components/TempButton";

export default function GamePage() {
    const pBarHeight = "h-6";
    const [key, setKey] = useState(0);

    const handleClick = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="text-white">
            <div className="w-full bg-gray-200 dark:bg-gray-700">
                <div key={key} className={`bg-blue-600 ${pBarHeight} ${styles.progressBar}`}></div>
            </div>
            <TempButton onClick={handleClick} />
        </div>
    );
}
