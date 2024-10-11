import { useState } from "react";

// Styles
import styles from "./Play.module.scss";

// Global State
import { useUserStore } from "@/zustand-hooks/useUserStore";

// Global Components
import Button from "@/components/actions/Button/Button";

// Utils
import { LEVEL } from "@/utils/constants";

interface IPlayHeader {
  timer: number;
  catchCounter: number;
  onClickStart: () => void;
}

export default function PlayHeader({
  timer,
  catchCounter,
  onClickStart,
}: IPlayHeader) {
  const { level, username } = useUserStore();

  const [isGameStartedBasedonClicked, isGameStartedBasedonClickedSet] =
    useState<boolean>(false);

  function handleClickStart() {
    onClickStart();
    isGameStartedBasedonClickedSet(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.game_box}>
        {isGameStartedBasedonClicked && (
          <div className={styles.game_info}>
            <p className={styles.game_info_text}>
              Elapsed time:{" "}
              <strong>
                {timer} {timer > 1 ? "seconds" : "second"}
              </strong>
            </p>
            <p className={styles.game_info_text}>
              Catch Attempt:{" "}
              <strong>
                {catchCounter} {catchCounter > 1 ? "times" : "time"}
              </strong>
            </p>
          </div>
        )}
        {!isGameStartedBasedonClicked && (
          <div className={styles.start_info}>
            <div>
              <h1 className={styles.greeting}>
                Okay <u>{username}</u>
              </h1>
              <p className={styles.greeting}>
                Let's see if you can win in <u>{level}</u>{" "}
                {level === LEVEL.GOD ? "💀" : ""} level
              </p>
            </div>
            <Button onClick={handleClickStart}>Start</Button>
          </div>
        )}
      </div>
    </div>
  );
}
