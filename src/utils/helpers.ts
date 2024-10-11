import { IScoreboard } from "@/zustand-hooks/useScoreboardStore";
import { LEVE_POINT } from "./constants";

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function calculateScore({attempt,level,time}: Omit<IScoreboard,"username">): number {
  return LEVE_POINT[level] - attempt - time;
}