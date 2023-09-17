import heads from "../assets/heads.png";
import tails from "../assets/tails.png";
import React from "react";
import { GameAnimationState } from "../constants/constants.ts";

export function GameAnimation({ gameState, gameResult, side }) {
  const animationClass =
    gameState === GameAnimationState.AWAITING
      ? "awaiting-animation"
      : gameState === GameAnimationState.RESULTING
      ? "resulting-animation"
      : "";

  return (
    <>
      <div className={`game-animation ${animationClass}`}>
        <div className="coin" id="coin">
          <div
            className={`heads ${
              gameResult?.simulationResult?.toString() === "0"
                ? "visible"
                : ""
            }`}
          >
            <img src={heads} />
          </div>
          <div
            className={`tails ${
              gameResult?.simulationResult?.toString() === "1"
                ? "visible"
                : ""
            }`}
          >
            <img src={tails} />
          </div>
        </div>
        <div className="">
          {gameState == GameAnimationState.RESULT
            ? gameResult.simulationResult.toString()
            : ""}
        </div>
      </div>
    </>
  );
}
