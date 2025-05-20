<template>
  <div class="loginpage">
    <LoginBox ref="loginBox" />
    <div style="text-align: center">
      <el-button type="primary" @click="submit"> 登录 </el-button>
    </div>

    <div ref="box1" class="box1"></div>
    <div ref="box2" class="box2"></div>
  </div>
</template>

<script setup lang="ts">
import LoginBox from "./components/loginBox.vue";
import { onMounted, ref } from "vue";
console.log(import.meta.env);
defineOptions({
  name: "loginPage",
});
// 登录功能
const loginBox = ref<InstanceType<typeof LoginBox>>();
const submit = () => {
  if (loginBox.value) {
    loginBox.value.submitForm();
  }
};
const box1 = ref<HTMLDivElement>();
const box2 = ref<HTMLDivElement>();
let left = 0;
onMounted(() => {
  // const box2 = ref()
  setInterval(() => {
    if (box1.value) {
      box1.value.style.left = left++ + "px";
    }
    if (left > 1000) {
      left = 0;
    }
  }, 20);
  setBox2Animation();
});
let right = 0;
const setBox2Animation = () => {
  if (box2.value) {
    box2.value.style.right = right++ + "px";
  }
  if (right > 1000) {
    right = 0;
    return;
  }
  requestAnimationFrame(setBox2Animation);
};
</script>

<style lang="less" scoped>
@height: 40px;
@width: @height * 1.33;
@red: red;

.styles() {
  text-align: center;
  padding: 4px 12px;
}

.float(@type) {
  float: @type;
}

.loginDiv {
  height: @height;
  width: @width;
  background-color: @red;
  color: pink;
  margin-top: 8px;

  &:hover {
    background-color: darken(@red, 10%);
  }

  > div {
    width: 10px;
    height: 10px;
    background-color: orange;
  }

  .styles();
}

.loginDiv2 {
  .loginDiv();
  color: black;
  .float(right);
}

.loginpage {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box() {
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
}

.box1 {
  .box();
  background-color: deeppink;
  left: 0;
}

.box2 {
  .box();
  background-color: deepskyblue;
  right: 0;
}
</style>
