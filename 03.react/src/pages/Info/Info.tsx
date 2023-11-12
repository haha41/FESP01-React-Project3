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
      const response = await instance.get<TodoResponse>(`/${todoId}`);
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div id="page" className={styles.todoInfoWrapper}>
      <Link to="/" className="backBtn">
        &lt;
      </Link>
      <Header>TODO App 상세 조회</Header>
      <div className={styles.contentWrapper}>
        <ul className={styles.todoListWrapper}>
          {data?.item &&
            Object.entries(data.item).map(([key, value]) => (
              <li key={key}>
                <div>{`${key}: ${value}`}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
