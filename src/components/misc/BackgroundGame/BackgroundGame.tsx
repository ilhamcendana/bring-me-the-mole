"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import styles from "./BackgroundGame.module.scss";

export default function BackgroundGame() {
  const pathname = usePathname();

  const isGamePlayed = useMemo(() => pathname === "/play", [pathname]);
  return (
    <div
      className={`${styles.game_background} ${
        isGamePlayed ? styles.play_mode : styles.init_mode
      }`}
    />
  );
}
