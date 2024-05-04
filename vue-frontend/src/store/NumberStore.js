import { defineStore } from "pinia";

export const useNumberStore = defineStore("number", {
  state: () => ({
    // 抽選済みの数字を保持する状態
    selectedNumberInfo: [],
  }),
  actions: {
    // 抽選済みの数字を更新するアクション
    setSelectedNumberInfo(number) {
      this.selectedNumberInfo.push(number);
    },
    // 抽選済みの数字をクリアするアクション
    clearSelectedNumberInfo() {
      this.selectedNumberInfo = [];
    },
  },
  persist: {
    storage: localStorage,
  },
});
