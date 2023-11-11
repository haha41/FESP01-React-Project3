import instance from "@/api/instance";
import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Header } from "@/layout/Header/Header";
import { useState } from "react";
import styles from "./Update.module.css";

export const Update = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = () => {
    instance
      .patch("", {
        title: title,
        content: content,
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={`${styles.registPage}`}>
      <Header>TODO App 수정</Header>
      <div className={styles.registContainer}>
        <Input label="제목:" value={title} onChange={handleTitleChange} />
        <Input label="내용:" value={content} onChange={handleContentChange} />
        <Button option="regist" label="수정" onClick={handleSubmit} />
      </div>
    </div>
  );
};
