import { LEVEL } from "@/utils/constants";
import { debounce } from "@/utils/helpers";
import { useUserStore } from "@/zustand-hooks/useUserStore";
import { useCallback, useEffect, useState } from "react";

const ruleByLevel = {
  [LEVEL.EASY]: {
    total: 3,
    moleSpeed: 700,
  },
  [LEVEL.MEDIUM]: {
    total: 6,
    moleSpeed: 400,
  },
  [LEVEL.HARD]: {
    total: 12,
    moleSpeed: 200,
  },
  [LEVEL.GOD]: {
    total: 20,
    moleSpeed: 1000,
  },
};

export default function useMoleEngine() {
  const { level } = useUserStore();

  // State
  const [totalMoleByLevel, totalMoleByLevelSet] = useState<number>(
    ruleByLevel[level].total
  );
  const [catchCounter, catchCounterSet] = useState<number>(0);
  const [timer, timerSet] = useState<number>(0);
  const [whichHolesMoleShowed, whichHolesMoleShowedSet] = useState<
    number[] | null
  >(null);
  const [isTimerPaused, isTimerPausedSet] = useState<boolean>(true);
  const [isMolePaused, isMolePausedSet] = useState<boolean>(true);
  const [isWin, isWinSet] = useState<boolean>(false);
  const [isLose, isLoseSet] = useState<boolean>(false);
  const [isPrank, isPrankSet] = useState<boolean>(false);

  // Func
  function startTimer() {
    const interval = setInterval(() => timerSet((prev) => prev + 1), 1000);
    return interval;
  }

  function startMole(speed: number, max: number) {
    const interval = setInterval(
      () =>
        whichHolesMoleShowedSet(() => [
          Math.floor(Math.random() * Math.floor(max)),
          Math.floor(Math.random() * Math.floor(max)),
        ]),
      speed
    );
    return interval;
  }

  function addCatchCounter() {
    catchCounterSet((prev) => prev + 1);
  }

  function playerWin() {
    isWinSet(true);
    isMolePausedSet(true);
    isTimerPausedSet(true);
  }

  const debounceMoleFromShowed = useCallback(
    debounce(() => {
      isMolePausedSet(false);
    }, 100),
    []
  );

  function itsJustaPrank() {
    isPrankSet(true);
    isMolePausedSet(true);
    isTimerPausedSet(true);
  }

  function onCatchMole(catchIndex: number) {
    addCatchCounter();
    if (whichHolesMoleShowed?.includes(catchIndex)) return playerWin();
    if (level === LEVEL.GOD && catchCounter >= 10) return itsJustaPrank();
    isMolePausedSet(true);
    whichHolesMoleShowedSet([]);
    debounceMoleFromShowed();
  }

  function startGame() {
    isTimerPausedSet(false);
    isMolePausedSet(false);
  }

  // Set total by level
  useEffect(() => {
    totalMoleByLevelSet(ruleByLevel[level].total);
  }, [level]);

  // Timer interval
  useEffect(() => {
    let intervalTimer: NodeJS.Timeout | undefined = undefined;

    if (isTimerPaused || isLose || isWin || isPrank) {
      clearInterval(intervalTimer);
    } else {
      intervalTimer = startTimer();
    }

    return () => {
      clearInterval(intervalTimer);
    };
  }, [isTimerPaused, isLose, isWin, isPrank]);

  // Start mole to moving
  useEffect(() => {
    if (level) {
      let moleInterval: NodeJS.Timeout | undefined = undefined;

      if (isMolePaused || isLose || isWin || isPrank) {
        clearInterval(moleInterval);
      } else {
        moleInterval = startMole(
          ruleByLevel[level].moleSpeed,
          ruleByLevel[level].total
        );
      }

      return () => clearInterval(moleInterval);
    }
  }, [level, isMolePaused, isLose, isWin, isPrank]);

  // Time run out
  useEffect(() => {
    if (timer >= 180) {
      isLoseSet(true);
    }
  }, [timer]);

  return {
    totalMoleByLevel,
    timer,
    catchCounter,
    whichHolesMoleShowed,
    onCatchMole,
    isWin,
    isPrank,
    startGame,
    isLose,
  };
}
