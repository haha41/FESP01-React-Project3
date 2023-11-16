import instance from "@/api/instance";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/layout/Header/Header";
import styles from "./Info.module.css";

export const Info = () => {
  const { todoId } = useParams();
  const [data, setData] = useState<{ item: TodoItem | undefined }>();

  async function fetchData() {
    try {
      console.log("Fetching data for todoId:", todoId); // 추가

      const response = await instance.get<TodoResponse>(`/${todoId}`);
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    console.log("Effect executed for todoId:", todoId); // 추가
  }, [todoId]);

  const todoData = {
    title: data?.item?.title,
    content: data?.item?.content,
    done: data?.item?.done, // 널 병합 연산자 : 왼쪽이 null 또는 undefined일 때 오른쪽을 반환
    // done: data?.item?.done ?? false, // 널 병합 연산자 : 왼쪽이 null 또는 undefined일 때 오른쪽을 반환
    createdAt: data?.item?.createdAt,
    updatedAt: data?.item?.updatedAt,
  };
  const doneCheck = (done: boolean | undefined) => {
    console.log("done value:", done); // 추가
    return done === false ? "미완료" : "완료";
  };
  return (
    <div id="page" className={styles.todoInfoWrapper}>
      <Link to="/" className={styles.backBtn}>
        &lt;
      </Link>
      <Header>TODO App 상세 조회</Header>
      <div className={styles.contentWrapper}>
        <ul className={styles.todoListWrapper}>
          <li>
            <div>제목: {todoData.title}</div>
          </li>
          <li>
            <div>내용: {todoData.content}</div>
          </li>
          <li>
            <div>완료여부: {doneCheck(todoData.done)}</div>
          </li>
          <li>
            <div>등록일: {todoData.createdAt}</div>
          </li>
          <li>
            <div>수정일: {todoData.updatedAt}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
