"use client";

import { LEVEL, PAGE_URL } from "@/utils/constants";
import styles from "./Leve.module.scss";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/zustand-hooks/useUserStore";

interface ILevelItem {
  item: LEVEL;
}

export default function LevelItem({ item }: ILevelItem) {
  const { push } = useRouter();

  // Global State
  const { setLevel } = useUserStore();

  function onClickLevel() {
    setLevel(item);
    push(PAGE_URL.PLAY);
  }
  return (
    <div onClick={onClickLevel} role="button" className={styles.level_item}>
      <span>{item}</span>
    </div>
  );
}
