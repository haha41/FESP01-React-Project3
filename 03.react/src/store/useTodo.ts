// import { createContext, useContext } from "react";

// interface todoContextType {
//   title: string;
//   content: string;
//   setTitle: React.Dispatch<React.SetStateAction<string>>;
//   setContent: React.Dispatch<React.SetStateAction<string>>;
// }

// const TodoContext = createContext<todoContextType | undefined>(undefined);

// export const useTodo = () => {
//   const context = useContext(TodoContext);
//   if (!context) {
//     throw new Error("useTodo must be used within a TodoProvider");
//   }
//   return context;
// };
