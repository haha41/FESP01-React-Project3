// import Footer from "../../layout/Footer";
// import Header from "../../layout/Header";

import instance from "./api/instance";
import styles from "./pages/TodoList/TodoList.module.css";

function App() {
  // const App = async function () {
  // const response = await instance.get<TodoListResponse>("/");
  // console.log(response.data);

  // const handleSubmit = () => {
  //   instance
  //     .post("", {
  //       title: title,
  // content: content,
  //     })
  //     .then(() => {
  //       window.location.href = "/";
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <>
      <div id={styles.content}>
        <ul className={styles.todoList}>
          <li className={styles.todoListItem}>
            <div className={styles.itemWrapper}>
              <input type="checkbox" />
              <a className={styles.undoItemLink} href="">
                javascript 공부
              </a>
            </div>
            <div className={styles.todoActionWrapper}>
              <a title="수정" className={styles.todoEditLink} href="">
                <i className={styles.far}>수정</i>
              </a>
              <button title="삭제" className={styles.deleteBtn}>
                <i className={styles.far}>삭제</i>
              </button>
            </div>
          </li>
        </ul>
        <a href="" className={styles.registBtn} title="할일등록">
          <i className={styles.far}>등록</i>
        </a>
      </div>
    </>
  );
}

export default App;
