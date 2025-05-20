import { defineStore } from "pinia";
export const useCounterStore = defineStore('counter', {
  state: () => ({
    connter: 1
  }),
  getters: {
    getCounter(): number {
      return this.connter
    }
  },
  actions: {
    changeCounterAction(val: number) {
      this.connter += val
    }
  }
})