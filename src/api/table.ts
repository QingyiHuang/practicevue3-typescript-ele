/*
 * @Author: HuangQingyi 297947067@qq.com
 * @Date: 2025-05-23 21:57:01
 * @LastEditors: HuangQingyi 297947067@qq.com
 * @LastEditTime: 2025-05-23 22:01:42
 * @FilePath: \practicevue3-typescript-ele\src\api\table.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "./httpinstance";
const getTable = (data) => {
  return http.post("/api/tableData", {
    data,
  });
};
export default { getTable };
