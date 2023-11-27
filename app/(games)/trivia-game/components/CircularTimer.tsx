import React from "react";
import styles from "./styles.module.css";

export default function CircularTimer() {
    return (
        <div className={styles.timer}>
            <svg viewBox="0 0 50 50" className={styles["circular-chart"]}>
                {/* <circle r="20" cx="25" cy="25" className={styles["circle-bg"]} /> */}
                <circle r="10" cx="25" cy="25" className={styles["circle"]} />
            </svg>
        </div>
    );
}
