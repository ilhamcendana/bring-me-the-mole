import { LEVEL } from "@/utils/constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IScoreboard {
  username: string;
  time: number;
  attempt: number;
  level: LEVEL;
}

interface IState {
  scoreboard: IScoreboard[];
}

interface IMethod {
  addScoreboard: (score: IScoreboard) => void;
}

const initialState: IState = {
  scoreboard: [],
};

export const useScoreboardStore = create(
  persist<IState & IMethod>(
    (set, get) => ({
      ...initialState,
      //
      // Method
      addScoreboard(score) {
        set({ scoreboard: [...get().scoreboard, score] });
      },
    }),
    {
      name: "scoreboard-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
