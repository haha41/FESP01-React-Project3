import { atom } from "recoil";

export const filteredDataState = atom({
  key: "filteredDataState",
  // default: { items: [] }, // useState의 초기값
  // default: { items: [] as undefined[] },
  default: { items: [] as TodoItem[] }, // useState의 초기값
});
