import React from "react";
import styles from "./styles.module.css";

const animationDuration = "20s";

export default function CircularTimer() {
    const circleSize = 10;

    return (
        <div className={styles.timer}>
            <svg viewBox={`0 0 ${circleSize * 5} ${circleSize * 5}`} className={styles["circular-chart"]}>
                <circle
                    r={circleSize}
                    cx={circleSize * 2.5}
                    cy={circleSize * 2.5}
                    className={styles["circle"]}
                    style={{ animation: `${styles.progress} ${animationDuration} linear forwards` }}
                />
            </svg>
        </div>
    );
}
