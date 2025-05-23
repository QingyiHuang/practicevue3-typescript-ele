<template>
    <div class="menuPart">
        <div class="logoPart">
            <img :src="logoImg">
            <h1 v-show="!isCollapse">一个文件</h1>
        </div>
        <div class="menuPart">
            <el-menu :collapse="isCollapse" active-text-color="#ffd04b" background-color="#545c64"
                class="el-menu-vertical-demo" :default-active="defaultActive" text-color="#fff" @open="handleOpen"
                @close="handleClose">
                <template v-for="item in menus" :key="item.key">
                    <el-sub-menu :index="item.key">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon.replace(/el-icon-/, '')" />
                            </el-icon>
                            <span>{{ item.name }}{{ item.key }}</span>
                        </template>
                        <el-menu-item-group>
                            <template v-for="one in item.children" :key="one.key">
                                <el-menu-item :index="one.key" @click="selectMenu(one)">
                                    <template #title>
                                        <el-icon>
                                            <component :is="one.icon.replace(/el-icon-/, '')" />
                                        </el-icon>
                                        <span>{{ one.name }}{{ one.key }}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-sub-menu>
                </template>

            </el-menu>
        </div>
    </div>

</template>

<script setup lang='ts'>
import useLoginStore from '@/stores/login/login'
import logoImg from '@/assets/logo.svg'
import $bus from '@/utils/bus'
import { toRaw, inject, ref, onMounted, onUnmounted } from 'vue'
import { mapPathToMenu } from '@/utils/utils'
import type { IMenu } from '@/types/login'
defineOptions({
    name: 'commonMenus'
})

const store = useLoginStore();
// 更安全的访问方式
const menus: IMenu[] = store.userPow?.menus ?? [];
const defaultActive = ref('')
import { useRoute } from 'vue-router'
const Route = useRoute()
let currentRoute = null
currentRoute = mapPathToMenu(Route.path, menus)
console.log(currentRoute)
if (currentRoute) {
    defaultActive.value = currentRoute.key
}
// onMounted(() => {
//     // 若菜单数据存在且有子项，默认选中第一个子项
//     if (menus.length > 0 && menus[0].children?.length > 0) {
//         defaultActive.value = menus[0].children[0].key;
//     }
// });

$bus.on('firstRoute', getRoute)
onUnmounted(() => {
    $bus.off('firstRoute', getRoute)
})
function getRoute(val) {
    defaultActive.value = val.meta.menuCode
    console.log(defaultActive)
}
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const isCollapse = inject<boolean>('isCollapse')
import { useRouter } from 'vue-router';
const router = useRouter()
const selectMenu = (val) => {
    const url = toRaw(val)?.url
    router.push({
        path: url
    })
}

</script>

<style lang="less" scoped>
.menuPart {
    display: flex;
    height: 100%;
    flex-direction: column;
    background-color: #545c64;
    overflow: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }
}

.logoPart {
    color: #ffffff;
    line-height: 60px;
    padding-left: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    height: 60px;

    img {
        width: 50px;
    }

    h1 {
        flex: 1;
        margin-left: 8px;
    }
}

.menuPart {
    flex: 1;
}
</style>