/*
 * @Author: HuangQingyi 297947067@qq.com
 * @Date: 2025-05-23 21:07:30
 * @LastEditors: HuangQingyi 297947067@qq.com
 * @LastEditTime: 2025-05-23 22:00:56
 * @FilePath: \practicevue3-typescript-ele\src\mock\table.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Mock from "mockjs";
const generateTableData = (pageSize = 10) => {
  return Mock.mock({
    [`list|${pageSize}`]: [
      {
        "id|+1": 1, // 自增 ID
        name: "@cname", // 随机中文姓名
        "age|18-60": 1, // 年龄 18-60
        address: "@county(true)", // 随机地址
        "status|1": ["正常", "禁用", "待审核"], // 状态枚举
        date: "@datetime", // 随机日期
        avatar: '@image("50x50")', // 随机图片（占位图）
      },
    ],
  }).list;
};
export default [
  {
    url: "/api/tableData",
    method: "post",
    response: () => ({
      code: 0,
      message: "success",
      data: {
        total: 300,
        list: generateTableData(),
      },
    }),
  },
];
