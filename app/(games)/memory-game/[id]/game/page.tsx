"use client";

import React, { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import useAppBadge from './hooks/useAppBadge';

interface CardType {
  id: number;
  image: string;
  matched: boolean;
}

function App() {
  const [cards, setCards] = useState<CardType[]>(shuffle);
  const [pickOne, setPickOne] = useState<CardType | null>(null);
  const [pickTwo, setPickTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card: CardType) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    let pickTimer: NodeJS.Timeout;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(handleTurn, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <div className="grid">
        {cards.map((card) => {
          // Destructured card properties
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => {
                handleClick(card);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
