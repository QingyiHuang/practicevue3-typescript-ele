/*
 * @Author: HuangQingyi 297947067@qq.com
 * @Date: 2025-05-23 23:39:22
 * @LastEditors: HuangQingyi 297947067@qq.com
 * @LastEditTime: 2025-05-23 23:55:34
 * @FilePath: \practicevue3-typescript-ele\src\stores\table\table.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
const useTable = defineStore("tableStore", {
  state: () => {
    return {
      searchParam: {},
    };
  },
  actions: {
    changeSearchParam(val) {
      this.searchParam = val;
    },
  },
  getters: {
    getSearchParam() {
      return this.searchParam;
    },
  },
});
export default useTable;
