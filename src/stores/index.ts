import { createPinia } from "pinia";
import type { App } from "vue";
import useLoginStore from "./login/login";

const store = createPinia();
// 刷新的时候判断路由权限
function regitsterStore(app: App) {
  app.use(store);
  const loginStore = useLoginStore();
  loginStore.setUserPow();
}
export default regitsterStore;
