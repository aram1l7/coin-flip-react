import { useMemo, useState } from "react";
import React from "react";
import { GameAnimationState } from "../constants/constants.ts";
import { Button, Checkbox, Form } from "semantic-ui-react";

export function BetForm({
  game,
  triggerAwaitingState,
  gameState,
  saveSide,
  side,
}) {
  const [wager, setWager] = useState(1);

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
    const value = event.target.checked;
    saveSide(value ? 0 : 1);
  };

  return (
    <Form>
      <Form.Field>
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
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          id="isHeads"
          name="isHeads"
          placeholder="true"
          checked={side === 0}
          onChange={updateSide}
          label="Side (is heads)"
        />
      </Form.Field>

      <Form.Field>
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
        />
      </Form.Field>

      <Form.Field>
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
        />
      </Form.Field>

      <Form.Field>
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
        />
      </Form.Field>

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

      <div className="btn-wrapper">
        <Button
          onClick={validBet ? placeBet : () => {}}
          disabled={!validBet || gameState !== GameAnimationState.IDLE}
          primary
        >
          Place Bet
        </Button>
      </div>
    </Form>
  );
}
