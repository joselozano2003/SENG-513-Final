"use client";
import Link from "next/link";
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Home() {

  //defining some constants to be used to change texts/image using useState
  const [coinText1, setCoinText1] = useState('Genre');
  const [coinText2, setCoinText2] = useState('# Players');
  const [coinText3, setCoinText3] = useState('Time');
  const [screenImage, setScreenImage] = useState<string | null>(null);

  //Called when user hovers mouse over the third card
  const handleCard3Hover = () => {
    // Change the coin text on hover
    setCoinText1('Creative\nAnswers');
    setCoinText2('8 Players');
    setCoinText3('45\nminutes')
    // Change the image on ipad on hover
    setScreenImage('/promptGameplay.png');
  };

  //Called when user hovers mouse over the fourth card
  const handleCard4Hover = () => {
    // Change the coin text on hover
    setCoinText1('Puzzle');
    setCoinText2('10 Players');
    setCoinText3('30\nminutes');
    // Change the image on ipad on hover
    setScreenImage('/triviaGameplay.png');
  };

  const handleCardLeave = () => {
    // Reset the coin text on leave
    setCoinText1('Genre');
    setCoinText2('# Players');
    setCoinText3('Time');
    // Reset the image on ipad on leave
    setScreenImage(null);
  };

    return (
        <div className={styles.container}>
          {/*Row 1 in order to style title-container, dev-about, and ipad-container on the same row*/}
          <div className={styles.row1}>

            {/*----Title----*/}
            <div className={styles['title-container']}>
              <div className={styles["title-text-wrapper"]}>
                <h1 className={styles["title-text1"]}>PARTY</h1>
                <h1 className={styles["title-text2"]}>FUN MEDLEY</h1>
              </div>
            </div>

            {/*----Dev About----*/}
            <div className={styles["dev-about"]}>
              <Link href="aboutDevs" passHref>
              <h1><u>about the devs</u></h1>
              </Link>
            </div>

            {/*----Ipad----*/}
            <div className={styles["ipad-container"]}>
              <ul>
                <div className={styles["ipad"]} id="ipad-pic">
                  <div className={styles["ipad-text"]} id="screen-text">
                    {screenImage ? (
                      <img src={screenImage} alt="Game Screen"/>
                    ) : (null)}
                  </div>
                </div>
              </ul>
            </div>
          </div>
          {/*-------------------------------------End of Row 1------------------------------------*/}

          {/*Row 2 in order to style cards-container and coin container on the same row */}
          <div className={styles.row2}>

            {/*---- 4 Cards----*/}
            <div className={styles["cards-container"]}>
              <ul className={styles["card-list"]}>

                {/*----#1 Not in use----*/}
                <div className={styles["card-inner"]}>
                  <div className={styles.card1} id="Card1">
                    <div className={styles["card-title"]}>
                      <h2 className="card-title-text"></h2>
                    </div>
                  </div>
                </div>

                {/*----#2 Not in use----*/}
                <div className={styles["card-inner"]}>
                  <div className={styles.card2} id="Card2">
                    <div className={styles["card-title"]}>
                      <h2 className="card-title-text"></h2>
                    </div>
                  </div>
                </div>

                {/*----#3 used----*/}
                <div className={styles["card-inner"]} onMouseEnter={() => {handleCard3Hover();}}onMouseLeave={() => {handleCardLeave();}}>
                  <Link href="/prompt-game" passHref>
                    <div className={styles.card3} id="Card3">
                      <div className={styles["card-title"]}>
                        <h2 className="card-title-text">Prompt Game</h2>
                      </div>
                    </div>
                  </Link>
                </div>

                {/*----#4 used----*/}
                <div className={styles["card-inner"]} onMouseEnter={() => {handleCard4Hover();}}onMouseLeave={() => {handleCardLeave();}}>
                  <Link href="/trivia-game" passHref>
                  <div className={styles.card4} id="Card4">
                    <div className={styles["card-title"]} >
                      <h2 className="card-title-text">Trivia Game</h2>
                    </div>
                  </div>
                  </Link>
                </div>
              </ul>
            </div>

            {/*----3 Coins----*/}
            <div className={styles["coin-container"]}>
              <ul className={styles["coin-list"]}>

                {/*----#1 used----*/}
                <div className={styles.coin1} id="coin1">
                  <h2 className={styles["coin-text"]} data-hover-text={coinText1}></h2>
                </div>

                {/*----#2 used----*/}
                <div className={styles.coin2} id="coin2">
                  <h2 className={styles["coin-text"]} data-hover-text={coinText2}></h2>
                </div>

                {/*----#3 used----*/}
                <div className={styles.coin3} id="coin3">
                  <h2 className={styles["coin-text"]} data-hover-text={coinText3}></h2>
                </div>
              </ul>
            </div>
          </div>
        </div>
     );
}
