import "./style.ts";
import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";
import router from "./router";
import Icons from "./ele/icons";

const app = createApp(App);
// 传递函数的时候 app.use会自动传入app并且对其进行调用

app.use(Icons);
app.use(store);
app.use(router);
app.mount("#app");
