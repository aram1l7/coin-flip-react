import heads from "../assets/heads.png";
import tails from "../assets/tails.png";
import React, { useEffect, useState } from "react";
import { GameAnimationState } from "../constants/constants.ts";

export function GameAnimation({ gameState, gameResult }) {
  const [headsVisible, setHeadsVisible] = useState(false);
  const [tailsVisible, setTailsVisible] = useState(false);

  const animationClass =
    gameState === GameAnimationState.AWAITING
      ? "awaiting-animation"
      : gameState === GameAnimationState.RESULTING
      ? "resulting-animation"
      : "";

  useEffect(() => {
    if (gameResult && gameResult.simulationResult) {
      if (gameResult.simulationResult.toString() === "0") {
        setHeadsVisible(true);
        setTailsVisible(false);
      } else {
        setHeadsVisible(false);
        setTailsVisible(true);
      }
    }
  }, [gameResult]);

  useEffect(() => {
    if (gameState === GameAnimationState.AWAITING) {
      if (
        document.querySelector(".heads")?.classList.contains("visible") &&
        document.querySelector(".tails")?.classList.contains("visible")
      ) {
        document.querySelector(".heads")?.classList.remove("visible");
      }
    }
  }, [gameState]);

  return (
    <>
      <div className={`game-animation ${animationClass}`}>
        <div className="coin" id="coin">
          <div className={`heads ${headsVisible ? "visible" : ""}`}>
            <img src={heads} />
          </div>
          <div className={`tails ${tailsVisible ? "visible" : ""}`}>
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
