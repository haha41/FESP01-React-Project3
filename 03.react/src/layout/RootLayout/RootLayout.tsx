import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import Button from "@/components/Button/Button";
import Link from "@/components/Link/Link";

export const RootLayout = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Footer />
      <Button
        option={"trash"}
        label={"테스트"}
        onClick={() => console.log("버튼 테스트")}
      ></Button>
      <Link path={"/Regist"}>링크 테스트</Link>
      <Link path={"/TodoInfo"}>Info 페이지</Link>
      <Link path={"/TodoList"}>목록 페이지</Link>
    </div>
  );
};
