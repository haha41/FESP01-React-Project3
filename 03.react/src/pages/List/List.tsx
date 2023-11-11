import { Header } from "@/layout/Header/Header";
import { Link } from "react-router-dom";

export const List = () => {
  return (
    <div>
      <Header>TODO App</Header>
      <Link to="/regist" className="">
        +
      </Link>
      <Link to="/update/:todoId" className="">
        업데이트
      </Link>
    </div>
  );
};
