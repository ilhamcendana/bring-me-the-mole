"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Global Component
import Button from "../../components/actions/Button/Button";
import Input from "../../components/form/Input/Input";

// Utils
import { PAGE_URL } from "@/utils/constants";

// Styles
import styles from "./home.module.scss";
import { useState } from "react";
import { useUserStore } from "@/zustand-hooks/useUserStore";

export default function IdleComponent() {
  const { push } = useRouter();

  // Global State
  const { setUsername } = useUserStore();

  // State
  const [username, usernameSet] = useState<string>("");

  function onClickPlay() {
    // Save username to zustand
    setUsername(username);
    push(PAGE_URL.LEVELS);
  }

  return (
    <div className={styles.container_idle}>
      <div className={styles.idle_item}>
        <Input
          className="w-full"
          label="Your Name"
          placeholder="Please enter your name"
          value={username}
          onChange={(e) => usernameSet(e.target.value)}
        />

        <Button disabled={!username} onClick={onClickPlay}>Play Now</Button>
      </div>
      <div className={styles.idle_item}>
        <p>Check scoreboard</p>
        <Link href={PAGE_URL.SCORE_BOARD}>
          <Button block variant="outlined">
            Scoreboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
