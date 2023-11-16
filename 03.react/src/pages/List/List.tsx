import instance from "@/api/instance";
import { Header } from "@/layout/Header/Header";
import styles from "@/pages/List/List.module.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const List = () => {
  const [data, setData] = useState<{ items: TodoItem[] | undefined }>(); // data는 객체 형태로, items라는 속성을 갖는다.
  const [filteredData, setFilteredData] = useState<{
    items: TodoItem[] | undefined;
  }>();
  const [searchInput, setSearchInput] = useState<string>(""); // searchInput의 타입은 string

  async function fetchData() {
    try {
      const response = await instance.get<TodoListResponse>("/");
      setData(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData().then((fetchedData) => setFilteredData(fetchedData)); // 초기 로딩시에 filteredData가 undefined 상태가 되어 렌더링에서 문제가 생기는 것을 방지
  }, []);

  const handleCheckTodo = function (id: number, done: boolean) {
    setFilteredData((prevData) => {
      const updatedItems = prevData?.items?.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      });
      updateCheckTodo(id, done); // 업데이트된 done 값을 전달
      return { ...prevData, items: updatedItems };
    });
  };

  const updateCheckTodo = (todoId: number, done: boolean) => {
    instance
      .patch(`/${todoId}`, {
        done: !done,
      })
      .catch((error) => {
        console.error(error);
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

  const handleShowAll = () => {
    setFilteredData(data);
  };

  const handleShowTrue = () => {
    const completedItems = data?.items?.filter((item) => item.done);
    setFilteredData({ items: completedItems || [] });
  };

  const handleShowFalse = () => {
    const incompletedItems = data?.items?.filter((item) => item.done === false);
    setFilteredData({ items: incompletedItems || [] });
  };

  const handleShowLatest = () => {
    if (data?.items) {
      const latestItems = [...data.items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFilteredData({ items: latestItems });
    } else {
      setFilteredData({ items: [] });
    }
  };

  const handleShowPast = () => {
    if (data?.items) {
      const latestItems = [...data.items].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setFilteredData({ items: latestItems });
    } else {
      setFilteredData({ items: [] });
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleShowSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data?.items) {
      const searchedItems = data.items.filter((item) =>
        item.title.toLowerCase().includes(searchInput)
      );

      if (searchedItems.length > 0) {
        console.log("검색 되었습니다.");
        setFilteredData({ items: searchedItems });
      } else {
        console.log("검색 결과가 없습니다.");
        setFilteredData({ items: [] });
      } // 조건이 false 일 때 (검색어가 일치하는 항목이 없을 때)
    } else {
      console.log("검색 결과가 없습니다.");
      setFilteredData({ items: [] });
    } // 조건이 undefined 일 때 (원본 데이터가 없을 때)
    setSearchInput("");
  };

  return (
    <div>
      <Header>TODO App</Header>
      <div id={styles.content}>
        <div className={styles.buttonWrapper}>
          <button onClick={handleShowAll}>전체</button>
          <button onClick={handleShowTrue}>완료</button>
          <button onClick={handleShowFalse}>미완료</button>
          <button onClick={handleShowLatest}>최신순</button>
          <button onClick={handleShowPast}>과거순</button>
        </div>
        <form onSubmit={handleShowSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={handleSearchInput}
          ></input>
          <button type="submit">검색</button>
        </form>
        <ul className={styles.todoList}>
          {filteredData?.items?.map((item, i) => {
            return (
              <li key={`${item._id}-${i}`} className={styles.todoListItem}>
                <div className={styles.itemWrapper}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckTodo(item._id, item.done)}
                    checked={item.done}
                  />
                  <Link
                    to={`/info/${item._id}`}
                    className={
                      item.done ? styles.doneItemLink : styles.undoItemLink
                    }
                  >
                    {item.title}
                  </Link>
                </div>
                <div className={styles.todoActionWrapper}>
                  <Link to={`/update/${item._id}`}>
                    <FontAwesomeIcon
                      style={{ color: "black" }}
                      icon={faPenToSquare}
                    />
                  </Link>
                  <button
                    title="삭제"
                    className={styles.deleteBtn}
                    onClick={() => handleTodoDelete(item._id)}
                  >
                    <FontAwesomeIcon
                      style={{ color: "black" }}
                      icon={faTrashCan}
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <Link to="/regist" className={styles.registBtn}>
          <FontAwesomeIcon style={{ color: "black" }} icon={faPlus} />
        </Link>
      </div>
    </div>
  );
};
