import Image from "next/image";
import Link from "next/link";
import React from 'react';
import styles from './styles.module.css';

import { cookies } from 'next/headers'
import AuthButton from "@/components/AuthButton";


export default function Home() {

    return (
        <div className={styles.container}>
      <div className={styles.row1}>
        <div className={styles['title-container']}>
          <div className={styles["title-text-wrapper"]}>
            <h1 className={styles["title-text1"]}>PARTY</h1>
            <h1 className={styles["title-text2"]}>FUN MEDLEY</h1>
          </div>
        </div>
        <div className={styles["dev-about"]}>
          <Link href="#" passHref>
            <h1><u>about the devs</u></h1>
          </Link>
        </div>
        <div className={styles["ipad-container"]}>
          <ul>
            <div className={styles["ipad"]} id="ipad-pic">
              <div className={styles["ipad-text"]} id="screen-text">
                <h1>test</h1>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles["cards-container"]}>
            <ul className={styles["card-list"]}>
              <div className={styles["card-inner"]}>
                <div className={styles.card1} id="Card1">
                <div className={styles["card-title"]}><h2 className="card-title-text"></h2></div>
              </div>
              </div>
              <div className={styles["card-inner"]}>
                <div className={styles.card2} id="Card2">
                <div className={styles["card-title"]}><h2 className="card-title-text"></h2></div>
              </div>
              </div>
              <div className={styles["card-inner"]}>
                <Link href="/memory-game/55555/lobby" passHref>
                  <div className={styles.card3} id="Card3">
                    <div className={styles["card-title"]}>
                      <h2 className="card-title-text">Memory Game</h2>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={styles["card-inner"]}>
                <Link href="/trivia-game" passHref>
                <div className={styles.card4} id="Card4">
                  <div className={styles["card-title"]}>
                    <h2 className="card-title-text">Trivia Game</h2>
                  </div>
                </div>
                </Link>
              </div>
            </ul>
        </div>
        <div className={styles["coin-container"]}>
          <ul className={styles["coin-list"]}>
            <div className={styles.coin1} id="coin1">
              <h2 className={styles["coin-text"]}>genre</h2>
            </div>
            <div className={styles.coin2} id="coin2">
              <h2 className={styles["coin-text"]}># of<br />Players</h2>
            </div>
            <div className={styles.coin3} id="coin3">
              <h2 className={styles["coin-text"]}>game<br />length</h2>
            </div>
          </ul>
        </div>
      </div>
    </div>
    );
}
