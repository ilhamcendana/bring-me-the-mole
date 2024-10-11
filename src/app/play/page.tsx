"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// styles
import styles from "@/local-components/play/Play.module.scss";

// Global Components
import Button from "@/components/actions/Button/Button";

// Local Components
import MoleInstrument from "@/local-components/play/MoleInstrument";
import PlayHeader from "@/local-components/play/PlayHeader";
import ModalResult from "@/local-components/play/ModalResult";

// Global State
import { useUserStore } from "@/zustand-hooks/useUserStore";
import { useScoreboardStore } from "@/zustand-hooks/useScoreboardStore";

// Utils
import { LEVEL, PAGE_URL } from "@/utils/constants";
import { calculateScore } from "@/utils/helpers";

// Hooks
import useMoleEngine from "@/hooks/useMoleEngine";

export default function GamePlay() {
  const { push } = useRouter();
  const { level, username } = useUserStore();

  const {
    totalMoleByLevel,
    timer,
    catchCounter,
    whichHolesMoleShowed,
    onCatchMole,
    startGame,
    isLose,
    isPrank,
    isWin,
  } = useMoleEngine();

  const { addScoreboard } = useScoreboardStore();

  const [mouseOverIndex, mouseOverIndexSet] = useState<number | null>(null);

  const isLevelGod = useMemo(() => level === LEVEL.GOD, [level]);

  const isShowingMole = useMemo(() => {
    return (index: number) => {
      if (!isLevelGod)
        return whichHolesMoleShowed?.includes(index) ? true : false;
      if (whichHolesMoleShowed?.includes(index) && mouseOverIndex !== index)
        return true;
      return false;
    };
  }, [whichHolesMoleShowed, mouseOverIndex, isLevelGod]);

  function onClickBackToHome() {
    if (!isWin) return push(PAGE_URL.HOME);
    addScoreboard({
      attempt: catchCounter,
      time: timer,
      username: username as string,
      level: level,
    });
    push(PAGE_URL.SCORE_BOARD);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1 } }}
    >
      <div className={styles.mole_container}>
        <PlayHeader
          timer={timer}
          catchCounter={catchCounter}
          onClickStart={startGame}
        />
        <MoleInstrument
          totalMole={totalMoleByLevel}
          onClick={(index) => timer > 0 ? onCatchMole(!isLevelGod ? index : 100) : null}
          onMouseOver={(index) => mouseOverIndexSet(index)}
          onMouseLeave={() => mouseOverIndexSet(null)}
          isShowingMole={isShowingMole}
        />

        {/* Win Modal */}
        <ModalResult
          isOpen={isWin}
          title="Congratulations, you won the game!"
          description={`Time: <strong>${timer} seconds</strong> <br/> Catch Attempt: <strong>${catchCounter} times</strong> <br/> Score: <strong>${calculateScore(
            { attempt: catchCounter, time: timer, level }
          )} points</strong> <br/> <br/>your score will be stored in scoreboard, ask someone to beat your score. <br/>Thanks for playing!`}
          ctas={[<Button key={1} onClick={onClickBackToHome}>Check Scoreboard</Button>]}
        />

        {/* Lose Modal */}
        <ModalResult
          isOpen={isLose}
          title="Game Over, you lose the game!"
          description={`Time: <strong>${timer} seconds</strong> <br/> Catch Attempt: <strong>${catchCounter} times</strong> <br/>your score will be not stored in scoreboard, try again next time. <br/>Thanks for playing!`}
          ctas={[<Button key={1} onClick={onClickBackToHome}>Back to Home</Button>]}
        />

        {/* Prank Modal */}
        <ModalResult
          isOpen={isPrank}
          title="Hahaha, you just got pranked!"
          description={`There's no way somebody can beat this, because the mole is hard to catch programmatically. Have a nice day and thanks for playing!`}
          ctas={[<Button key={1} onClick={onClickBackToHome}>Back to Home</Button>]}
        />
      </div>
    </motion.div>
  );
}
