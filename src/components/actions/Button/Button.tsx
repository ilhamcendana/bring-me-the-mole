import { ReactNode } from "react";

// Styles
import styles from "./Button.module.scss";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "outlined";
  block?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  block,
  className,
  ...props
}: IButton) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${block && styles.block} ${className}`} {...props}>
      {children}
    </button>
  );
}
