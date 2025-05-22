import "./assets/main.css";
import "normalize.css";
import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
import Icons from "./ele/icons";

// elementplus 反馈的css样式引入，或者用 vite-plugin-style-import
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
// 传递函数的时候 app.use会自动传入app并且对其进行调用
app.use(Icons);
app.use(store);
app.use(router);
app.mount("#app");
