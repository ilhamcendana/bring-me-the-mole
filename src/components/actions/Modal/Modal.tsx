import { ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

// Styles
import styles from "./Modal.module.scss";

interface IModal {
  isOpen: boolean;
  children?: ReactNode;
  onCancel?: () => void;
}

const variantOverlay: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const variantModal: Variants = {
  hide: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Modal({
  isOpen,
  children,
  onCancel = () => null,
}: IModal) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className={styles.modal}>
          <motion.div
            variants={variantOverlay}
            initial="hide"
            animate="show"
            exit="hide"
            className={styles.modal_overlay}
            onClick={onCancel}
          />

          <motion.div
            variants={variantModal}
            initial="hide"
            animate="show"
            exit="hide"
            className={styles.modal_body}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
