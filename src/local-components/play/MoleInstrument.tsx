import Image from "next/image";

// Assets
import mole from "@/assets/images/mole.png";

// styles
import styles from "./Play.module.scss";

interface IMoleInstrument {
  totalMole: number;
  onClick: (index: number) => void;
  isShowingMole: (index: number) => boolean;
  onMouseOver: (index: number) => void;
  onMouseLeave: () => void;
}

export default function MoleInstrument({
  totalMole,
  onClick,
  isShowingMole,
  onMouseOver,
  onMouseLeave,
}: IMoleInstrument) {
  return (
    <div className={styles.mole_container_inner}>
      <div className={styles.inner_container}>
        {new Array(totalMole).fill(undefined)?.map((_, i) => (
          <div
            key={i}
            className={styles.mole}
            role="button"
            onClick={() => onClick(i)}
            onMouseOver={() => onMouseOver(i)}
            onMouseLeave={onMouseLeave}
          >
            {isShowingMole(i) && (
              <Image key={i} priority alt="mole" src={mole} width={80} className="pop-in" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
