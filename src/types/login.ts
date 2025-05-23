/*
 * @Author: HuangQingyi 297947067@qq.com
 * @Date: 2025-05-21 16:50:52
 * @LastEditors: HuangQingyi 297947067@qq.com
 * @LastEditTime: 2025-05-23 22:13:28
 * @FilePath: \practicevue3-typescript-ele\src\types\login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ILoginparam {
  username: string;
  password: string;
}
export interface Imenu {
  children?: Imenu[];
  [key: string]: any;
}
export interface Ipow {
  pow: string;
  menus: Imenu[];
}
interface IOneMenu {
  name: string;
  key: string;
  icon: string;
  url?: string;
}
export interface Itable {
  total: number;
  list: any[];
}
export interface IMenu<T = IOneMenu> {
  name: string; // 改为必选
  key: string;
  icon: string; // 改为必选
  children?: T[]; // 如果不需要泛型，可以直接用 IOneMenu[]
  // 如果需要额外属性，可以明确声明而不是用索引签名
  [index: string]: unknown; // 最好用 unknown 而不是 any
}
