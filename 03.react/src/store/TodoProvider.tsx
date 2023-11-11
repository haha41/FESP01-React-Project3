import React, { createContext, useState, ReactNode } from "react";

interface TodoContextType {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

// Context 생성
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <TodoContext.Provider value={{ title, content, setTitle, setContent }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
