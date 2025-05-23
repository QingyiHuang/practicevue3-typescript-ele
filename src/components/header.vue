<template>
    <div class="headerbar">
        <div class="headerLeft">
            <el-button type="default" @click="changeFold" :icon="isFold ? Fold : Expand" />
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item, index) in breadCrumb" :key="index">{{ item.name
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="headerRiht">
            <!-- <el-button @click="exit">退出登录</el-button> -->
            <div class="avator">
                <img src="@/assets/avator.png">
                <el-dropdown placement="top-end" @command="handleCommand">
                    <el-button link> {{ store.getUsername }} </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { Expand, Fold } from '@element-plus/icons-vue';
import useLoginStore from '@/stores/login/login';
import type { IMenu } from '@/types/login';
import { mapPathToBreadCrumb } from '@/utils/utils';
import { ref, computed, toRefs } from 'vue';
defineOptions({
    name: 'componentHeader'
})
const props = defineProps<{
    exitLogin: () => void
}>()
const emits = defineEmits(['collapseChange'])
const store = useLoginStore()
const isFold = ref<boolean>(false)
const changeFold = () => {
    isFold.value = !isFold.value
    emits('collapseChange', isFold.value)
}
enum ECommand {
    EXIT = 'exit',
    EDIT = 'edit'
}
import { useRoute } from 'vue-router';
const Route = useRoute()
const menus: IMenu[] = store.userPow?.menus ?? [];
const { path } = toRefs(Route)
const breadCrumb = computed(() => {
    return mapPathToBreadCrumb(path.value, menus)
})
console.log(breadCrumb)
const handleCommand = (val: ECommand) => {
    switch (val) {
        case (ECommand.EDIT): edit(); break;
        case (ECommand.EXIT): exit(); break;
        default:
            // 可选的默认情况（TypeScript 会检查是否覆盖所有 enum 情况）
            const exhaustiveCheck: never = val;
            throw new Error(`未知的 command: ${exhaustiveCheck}`);
    }
}
const exit = () => {
    props.exitLogin()
}
const edit = () => {
    window.console.log('修改密码')
}
</script>

<style lang="less" scoped>
.headerbar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    align-items: center;
    background-color: #ffffff;

    .headerLeft {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .headerRiht {
        height: 100%;

        .avator {
            height: 100%;
            display: flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
            }
        }
    }
}
</style>