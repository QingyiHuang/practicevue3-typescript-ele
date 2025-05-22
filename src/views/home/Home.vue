<template>
    <!-- <div class="home">
        {{ connter }}
        {{ store.getCounter }}
        <button @click="addFn">+1</button>
        <button @click="subFn">-1</button>
    </div>
    <div>
        <el-button @click="exit">退出登录</el-button>
    </div> -->
    <div class="content">
        <aside :class="{ aside: true, retractAside: isCollapse }">
            <Menus />
        </aside>
        <div class="content-right">
            <div class="header">
                <Header :exitLogin="exit" @collapseChange="collapseChange" />
            </div>
            <div class="main">
                <RouterView />
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import Header from '@/components/header.vue'
import { toRefs, ref, provide } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import Menus from '@/components/menus.vue';
import { RouterView } from 'vue-router';
const store = useCounterStore()
const { connter } = toRefs(store)
console.log(connter)
defineOptions({
    name: 'homePage'
})
const addFn = () => {
    store.changeCounterAction(20)
}
const subFn = () => {
    store.connter--
}
const router = useRouter()
const exit = () => {
    window.localStorage.removeItem('token')
    router.push('/login')
}
const isCollapse = ref<boolean>(false)
const collapseChange = (isFold: boolean) => {
    isCollapse.value = isFold
}
provide('isCollapse', isCollapse)
</script>

<style lang="less" scoped>
.content {
    height: 100vh;
    display: flex;

    .aside {
        width: 300px;
        height: 100%;
        transition: all 0.25s linear;
    }

    .retractAside {
        width: 60px;
    }

    .content-right {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .header {
        height: 60px;
    }

    .main {
        flex: 1;
    }
}
</style>