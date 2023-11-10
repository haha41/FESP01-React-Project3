import "./App.css";
import Header from "./layout/Header";
import { RouterProvider, RouterProviderProps } from "react-router-dom";
import router from "./routes/routes";

function App() {
  return (
    <>
      <RouterProvider {...({ router } as RouterProviderProps)}>
        <Header />
      </RouterProvider>
    </>
  );
}

export default App;
