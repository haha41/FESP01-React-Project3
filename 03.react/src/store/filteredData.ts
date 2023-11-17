import { atom } from "recoil";

export const filteredDataState = atom({
  key: "filteredDataState",
  default: { items: [] as TodoItem[] },
});
