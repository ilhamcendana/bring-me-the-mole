import styles from "./Input.module.scss";

interface IINput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label: string;
}

export default function Input({
  className,
  inputClassName,
  labelClassName,
  label,
  ...props
}: IINput) {
  return (
    <div className={`${styles.input_container} ${className}`}>
      <label className={labelClassName} htmlFor={props.id}>
        {label}
      </label>
      <input
        type={props.type || "text"}
        required
        {...props}
        className={inputClassName}
      />
    </div>
  );
}
