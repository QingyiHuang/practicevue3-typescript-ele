import { defineStore } from "pinia";
import Api from "@/api/user";
import type { ILoginparam } from "@/types/login";
import { ElNotification, ElMessage } from "element-plus";
import useAES from "@/hooks/useAES";
import type { RouteRecordRaw } from "vue-router";
import { homeRouteChildren } from "@/router/power";
import type { Imenu } from "@/types/login";
import router from "@/router";
const AESFunc = useAES();
type UserPermission = any;
interface Ipow {
  pow: string;
  menus: Imenu[];
}
const useLoginStore = defineStore("login", {
  state: () => {
    return {
      username: window.localStorage.getItem("username")
        ? AESFunc.decrypt(window.localStorage.getItem("username"), "hqy")
        : "",
      token: window.localStorage.getItem("token") ?? "",
      userPow: window.sessionStorage.getItem("usePow")
        ? JSON.parse(window.sessionStorage.getItem("usePow"))
        : null,
    };
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
  },
  actions: {
    async changeUsers(obj: ILoginparam) {
      try {
        const res: UserPermission = await Api.login({
          username: obj.username,
          password: obj.password,
        });

        ElMessage({
          message: "登录成功",
          type: "success",
        });
        this.username = res.username;
        this.token = res.token;
        window.localStorage.setItem("token", this.token);
      } catch (err) {
        ElNotification({
          title: "登录失败",
          message: err,
          type: "info",
        });
        throw new Error("登录失败");
      }
    },
    setUserPow(val: Ipow) {
      this.userPow = val;
      window.sessionStorage.setItem("usePow", JSON.stringify(val));
      // 动态的添加路由
      const routeArry: RouteRecordRaw[] = homeRouteChildren;
      console.log(routeArry);
      for (const i of val.menus) {
        for (const menu of i.children) {
          const newroute = routeArry.find((item) => item.path === menu.url);
          console.log(newroute);
          router.addRoute("home", newroute);
        }
      }
    },
  },
});
export default useLoginStore;
