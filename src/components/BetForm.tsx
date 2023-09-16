import { useMemo, useState } from "react";
import React from "react";
import { GameAnimationState } from "../constants/constants.ts";

export function BetForm({ game, triggerAwaitingState, gameState }) {
  const [wager, setWager] = useState(1);
  const [side, setSide] = useState(0);
  const [numberOfCoins, setNumberOfCoins] = useState(1);
  const [numberCorrect, setNumberCorrect] = useState(1);
  const [probability, setProbability] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [potentialPayout, setPotentialPayout] = useState(0);
  const [validBet, setValidBet] = useState(false);
  const [invalidReason, setInvalidReason] = useState("");

  const placeBet = async () => {
    game.placeBet(
      1234, // userId: ,
      wager, // wager: number,
      side, // side: Side,
      numberOfCoins, // numberOfCoins: number,
      numberCorrect // numberCorrect: number
    );
    triggerAwaitingState();
    let coin: HTMLElement = document.getElementById("coin") as HTMLElement;
    let i = Math.floor(Math.random() * 2);

    coin.style.animation = "none";
    if (i) {
      setTimeout(function () {
        coin.style.animation = "spin-heads 3s forwards";
      }, 100);
    } else {
      setTimeout(function () {
        coin.style.animation = "spin-tails 3s forwards";
      }, 100);
    }
  };

  useMemo(() => {
    if (game) {
      if (numberOfCoins > game.maxNumberOfCoins) {
        setProbability(0);
        setMultiplier(1);
        setPotentialPayout(0);
        setValidBet(false);
        setInvalidReason(
          `Number of Coins (${numberOfCoins}) exceeds the game maximum (${game.maxNumberOfCoins})`
        );
      } else if (wager > game.maxWager) {
        setProbability(0);
        setMultiplier(1);
        setPotentialPayout(0);
        setValidBet(false);
        setInvalidReason(`Wager (${wager}) excced max of ${game.maxWager}`);
      } else if (numberOfCoins < numberCorrect) {
        setProbability(0);
        setMultiplier(1);
        setPotentialPayout(0);
        setValidBet(false);
        setInvalidReason(
          `Number Correct (${numberCorrect}) must be <= Number of Coins (${numberOfCoins})`
        );
      } else {
        const p = game.getProbability(numberOfCoins, numberCorrect);
        const m = game.getMultiplier(numberOfCoins, numberCorrect);
        const po = wager * m;
        setProbability(p);
        setMultiplier(m);
        setPotentialPayout(po);
        setValidBet(true);
        setInvalidReason("");
      }
    }
  }, [wager, game, numberOfCoins, numberCorrect]);

  const updateWager = (event) => {
    const target = event.target;
    var value = target.value;
    setWager(Number(value));
  };

  const updateNumberCorrect = (event) => {
    const target = event.target;
    var value = target.value;
    setNumberCorrect(Number(value));
  };

  const updateNumberOfCoins = (event) => {
    const target = event.target;
    var value = target.value;
    setNumberOfCoins(Number(value));
  };

  const updateSide = (event) => {
    const target = event.target;
    var value = target.value;
    setSide(value ? 0 : 1);
  };

  return (
    <div className="">
      <div className="">
        <h2>Bet Form</h2>
      </div>

      <div className="">
        <label>Wager</label>
        <input
          className=""
          id="wager"
          name="wager"
          type="number"
          min="1"
          max="10"
          step="1"
          placeholder="1"
          value={wager}
          onChange={updateWager}
        ></input>
      </div>

      <div className="">
        <label>Side (is heads)</label>
        <input
          className=""
          id="isHeads"
          name="isHeads"
          type="checkbox"
          placeholder="true"
          checked={side == 0}
          onChange={updateSide}
        ></input>
      </div>

      <div className="">
        <label>Number of Coins</label>
        <input
          className=""
          id="numberOfCoins"
          name="numberOfCoins"
          type="number"
          min="1"
          max="10"
          step="1"
          placeholder="1"
          value={numberOfCoins}
          onChange={updateNumberOfCoins}
        ></input>
      </div>

      <div className="">
        <label>Number Correct</label>
        <input
          className=""
          id="numberCorrect"
          name="numberCorrect"
          type="number"
          min="1"
          max="10"
          step="1"
          placeholder="1"
          value={numberCorrect}
          onChange={updateNumberCorrect}
        ></input>
      </div>

      {validBet ? (
        <>
          <div className="">
            <label>Multiplier:</label>
            <span className="">
              {multiplier.toFixed(2)} ({(probability * 100).toFixed(2)}%)
            </span>
          </div>

          <div className="">
            <label>Potential Payout:</label>
            <span className="">{potentialPayout.toFixed(2)}</span>
          </div>
        </>
      ) : (
        <div className="">Invalid bet: {invalidReason}</div>
      )}

      <div className="">
        <input
          type="button"
          value="Place Bet"
          onClick={validBet ? placeBet : () => {}}
          disabled={!validBet}
        ></input>
      </div>
    </div>
  );
}
