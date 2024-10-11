import { LEVEL } from "@/utils/constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IState {
  username: string | null;
  level: LEVEL;
}

interface IMethod {
  setUsername: (username: string) => void;
  setLevel: (level: LEVEL) => void;
  reset: () => void;
}

const initialState: IState = {
  username: null,
  level: LEVEL.EASY,
};

export const useUserStore = create(
  persist<IState & IMethod>(
    (set, get) => ({
      ...initialState,
      //
      // Method
      setUsername(username) {
        set({ username });
      },
      setLevel(level) {
        set({ level });
      },
      reset() {
        set({ level: LEVEL.EASY, username: null });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
