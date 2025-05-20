<script setup lang="ts">
import { RouterView } from 'vue-router'
// // 尝试监听手机翻转
// const oppositeOrientation = screen.orientation.type.startsWith("portrait")
//   ? "landscape"
//   : "portrait";
// screen.orientation.lock(oppositeOrientation)
// // screen.orientation.addEventListener("change", (event) => {
// //   console.log(event)
// //   // console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
// // });

</script>

<template>
  <RouterView />
</template>

<style lang="less" scoped>
body {
  transition: all 0.25s linear;
}

@media screen and (orientation: portrait) {
  body {
    width: 100vw;
    height: 100vh;
    transform: rotate(0deg);
    /* 无作用，仅占位 */
  }
}

/* 横屏样式 */
@media screen and (orientation: landscape) {
  body {
    width: 100vh;
    /* 交换宽高 */
    height: 100vw;
    transform: rotate(90deg);
    /* 仅视觉旋转，设备仍可物理旋转 */
  }
}
</style>
