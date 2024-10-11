"use client";

// Local Components
import LevelList from "@/local-components/level/LevelList";

// Global State
import { useUserStore } from "@/zustand-hooks/useUserStore";

export default function Level() {
  const {username} = useUserStore()
  return (
    <div className="container mx-auto px-4">
      <div className="h-[100svh] w-full flex flex-col justify-center items-center gap-11">
        <h1 className="text-5xl font-bold text-white">Pick your level, <span className="underline">{username}</span></h1>

        <LevelList />
      </div>
    </div>
  );
}
