import instance from "@/api/instance";
import { Header } from "@/layout/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@/pages/List/List.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const List = () => {
  const [data, setData] = useState<{ items: TodoItem[] | undefined }>();

  async function fetchData() {
    try {
      const response = await instance.get<TodoListResponse>("/");
      // console.log(response.data);
      setData(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckTodo = function (id: number) {
    setData((prevData) => {
      const updatedItems = prevData?.items?.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      });
      return { ...prevData, items: updatedItems };
    });
  };

  const handleTodoDelete = function (id: number) {
    const deleteItem = async function () {
      try {
        await instance.delete<TodoResponse>(`/${id}`);
        setData((prevData) => {
          const updatedItems = prevData?.items?.filter(
            (item) => item._id !== id
          );
          return { ...prevData, items: updatedItems };
        });
      } catch (error) {
        console.error(error);
      }
    };
    deleteItem();
  };

  return (
    <div>
      <Header>TODO App</Header>

      <div id={styles.content}>
        <ul className={styles.todoList}>
          {data?.items?.map((item, i) => {
            return (
              <li key={`${item._id}-${i}`} className={styles.todoListItem}>
                <div className={styles.itemWrapper}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckTodo(item._id)}
                    checked={item.done}
                  />
                  <Link
                    to="/todoInfo/:todoId"
                    className={
                      item.done ? styles.doneItemLink : styles.undoItemLink
                    }
                  >
                    {item.title}
                  </Link>
                </div>
                <div className={styles.todoActionWrapper}>
                  <Link to="/update/:todoId" className="">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  <button
                    title="삭제"
                    className={styles.deleteBtn}
                    onClick={() => handleTodoDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <Link to="/regist" className="registBtn">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </div>
  );
};
