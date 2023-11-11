import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const RootLayout = (): JSX.Element => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};
