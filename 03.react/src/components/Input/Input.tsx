import { useId } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
}: InputProps) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={styles.inputField}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
