import { atom } from "recoil";

export const dataState = atom({
  key: "dataState",
  default: { items: [] as TodoItem[] }, // useState의 초기값
});
