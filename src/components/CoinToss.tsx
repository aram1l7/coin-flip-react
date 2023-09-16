import React, { useState, useMemo, useEffect, isValidElement } from "react";
import CoinToss, {
  EventEmit,
  BetResultEvent,
  GameResultEvent,
} from "../contract/contract.ts";

import { GameAnimationState } from "../constants/constants.ts";
import { GameAnimation } from "./GameAnimation.tsx";
import BetHistory from "./BetHistory.tsx";
import { GameHistory } from "./GameHistory.tsx";
import { BetForm } from "./BetForm.tsx";

export default function CoinTossUx() {
  const [game, setGame] = useState();
  const [gameAnimationState, setGameAnimationState] = useState(
    GameAnimationState.IDLE
  );
  const [lastGameResultEvent, setLastGameResultEvent] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [betHistory, setBetHistory] = useState([]);

  const triggerAwaitingState = () => {
    setGameAnimationState(GameAnimationState.AWAITING);
  };

  const triggerResultingState = async (gameResultEvent) => {
    setGameAnimationState(GameAnimationState.RESULTING);
    setLastGameResultEvent(gameResultEvent);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Pretend resulting transition animation takes 1 second
    setGameAnimationState(GameAnimationState.RESULT);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Pretend result is displayed for  3 seconds
    setGameAnimationState(GameAnimationState.IDLE);
  };

  const callbackHandler = (event: EventEmit) => {
    if (event.eventType == "GameResult") {
      console.log("GameResult received:");
      console.log(event.eventObject);
      triggerResultingState(event.eventObject);
      addToGameHistory(event.eventObject);
    } else if (event.eventType == "BetResult") {
      console.log("BetResult received:");
      console.log(event.eventObject);
      addToBetHistory(event.eventObject);
    } else {
      console.log("Unknown EventEmit received:");
      console.log(event);
    }
  };

  useEffect(() => {
    const g: any = new CoinToss();
    g.subscribeToGameEvents(callbackHandler);
    setGame(g);
  }, []);

  const addToBetHistory = (betResultEvent: BetResultEvent) => {
    const bh: any = betHistory;
    bh.push(betResultEvent);
    setBetHistory(bh);
  };

  const addToGameHistory = (gameResultEvent: GameResultEvent) => {
    const gh: any = gameHistory;
    gh.push(gameResultEvent);
    setGameHistory(gh);
  };

  return (
    <>
      <div className="">
        <h1>Coin Toss</h1>
      </div>

      <BetForm gameState={gameAnimationState} game={game} triggerAwaitingState={triggerAwaitingState} />
      <GameAnimation
        gameState={gameAnimationState}
        gameResult={lastGameResultEvent}
      />
      <GameHistory gameHistory={gameHistory} />
      <BetHistory betHistory={betHistory} />
    </>
  );
}
