"use client";

import Link from "next/link";
import { useMemo } from "react";

// Global Components
import Button from "@/components/actions/Button/Button";

// Utils
import { PAGE_URL } from "@/utils/constants";
import { calculateScore } from "@/utils/helpers";

// Global State
import { useScoreboardStore } from "@/zustand-hooks/useScoreboardStore";
import { useUserStore } from "@/zustand-hooks/useUserStore";
import { useRouter } from "next/navigation";

export default function Scoreboard() {
  const { push } = useRouter();
  const { scoreboard } = useScoreboardStore();
  const { username, reset } = useUserStore();

  const scoreboardSorted = useMemo(() => {
    return scoreboard.sort(
      (a, b) =>
        calculateScore({ attempt: b.attempt, level: b.level, time: b.time }) -
        calculateScore({ attempt: a.attempt, level: a.level, time: a.time })
    );
  }, [scoreboard]);

  function onClickBackHome() {
    reset();
    push(PAGE_URL.HOME);
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-amber-700 rounded-xl py-4 pl-4">
        <h1 className="text-4xl text-amber-700 font-bold text-center mb-8 pr-4">
          Scoreboard
        </h1>
        {scoreboard.length === 0 ? (
          <div className="text-center">
            <p>No data</p>
          </div>
        ) : (
          <div className="h-[500px] overflow-auto pr-4">
            {scoreboardSorted.map((item, i) => (
              <div
                key={`${item.username}_${i}`}
                className="border-b border-b-amber-700 py-4"
              >
                <p className="text-amber-700 font-bold">
                  Rank {i + 1}: {item.username}{" "}
                  {username === item.username && (
                    <span className="text-green-500"> - You</span>
                  )}
                </p>
                <div className="text-sm">
                  <p>Time: {item.time} seconds</p>
                  <p>Attempt: {item.attempt} times</p>
                  <p>Level: {item.level}</p>
                </div>
                <p className="mt-4">
                  Score:{" "}
                  <strong>
                    {calculateScore({
                      attempt: item.attempt,
                      level: item.level,
                      time: item.time,
                    })}{" "}
                    points
                  </strong>
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="py-4 flex justify-center">
          <Button onClick={onClickBackHome}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
