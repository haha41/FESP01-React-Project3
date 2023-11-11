import { ReactNode } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}
export const Header = ({ children }: HeaderProps) => {
  return (
    <header>
      <h1 className={`${styles.title}`}>{children}</h1>
    </header>
  );
};
