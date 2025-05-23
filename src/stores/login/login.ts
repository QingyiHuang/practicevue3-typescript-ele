import { defineStore } from "pinia";
import Api from "@/api/user";
import type { ILoginparam } from "@/types/login";
import { ElNotification, ElMessage } from "element-plus";
import useAES from "@/hooks/useAES";
import type { RouteRecordRaw } from "vue-router";
import { homeRouteChildren } from "@/router/power";
import type { Ipow } from "@/types/login";
import router from "@/router";
const AESFunc = useAES();
type UserPermission = any;

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
    setUserPow(val?: Ipow) {
      if (val) {
        this.userPow = val;
        window.sessionStorage.setItem("usePow", JSON.stringify(val));
      } else if (window.sessionStorage.getItem("usePow")) {
        this.userPow = JSON.parse(window.sessionStorage.getItem("usePow"));
      }
      // 动态的添加路由
      if (this.userPow) {
        const routeArry: RouteRecordRaw[] = homeRouteChildren;
        console.log(routeArry);
        // 根据请求动态添加,并记录第一个路由
        let firstRoute: any = null;
        for (const i of this.userPow.menus) {
          for (const menu of i.children) {
            const newroute = routeArry.find((item) => item.path === menu.url);
            if (newroute) {
              if (!firstRoute) {
                firstRoute = newroute;
                window.sessionStorage.setItem(
                  "firstRoute",
                  JSON.stringify(firstRoute)
                );
              }
              router.addRoute("home", newroute);
            }
          }
        }
      }
    },
  },
});
export default useLoginStore;
