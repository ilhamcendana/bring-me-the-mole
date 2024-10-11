import { LEVEL } from "@/utils/constants";
import styles from "./Leve.module.scss";
import LevelItem from "./LevelItem";

export default function LevelList() {
  return (
    <div className={styles.level_container}>
      {Object.values(LEVEL).map(x => (
        <LevelItem key={x} item={x} />
      ))}
    </div>
  );
}
