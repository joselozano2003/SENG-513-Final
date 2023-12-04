import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const animationDuration = "20s";

interface Props {
    questionData: any;
}

export default function CircularTimer({ questionData }: Props) {

    const [key, setKey] = useState(questionData);

    useEffect(() => {
        // Update the key state when currentQuestion changes
        setKey(questionData);
    }, [questionData]);

    return (
        <div className={styles.timer}>
            <svg viewBox="0 0 50 50" className={styles["circular-chart"]}>
                <circle
                    r="10"
                    cx="25"
                    cy="25"
                    className={styles["circle"]}
                    style={{ animation: `${styles.progress} ${animationDuration} linear infinite` }}
                />
            </svg>
        </div>
    );
}
