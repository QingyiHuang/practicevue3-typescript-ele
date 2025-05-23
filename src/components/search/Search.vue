<template>
    <div class="searchBox">
        <el-form :model="baseForm" ref="baseSearchForm" label-width="120" label-position="top">
            <div class="flex-container">
                <!-- 名称输入 -->
                <div class="form-item">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="baseForm.name" placeholder="请输入名称" clearable />
                    </el-form-item>
                </div>

                <!-- 区域选择 -->
                <div class="form-item">
                    <el-form-item label="区域" prop="region">
                        <el-select v-model="baseForm.region" placeholder="请选择区域" clearable>
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                </div>

                <!-- 时间选择 -->
                <div class="form-item">
                    <el-form-item label="Activity time" prop="time">
                        <el-date-picker v-model="baseForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" :default-time="defaultTime2" />
                    </el-form-item>
                </div>

                <!-- 操作按钮 -->
                <div class="form-action">
                    <el-form-item>
                        <div class="button-group">
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                        </div>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import dayjs from 'dayjs'
import { toRaw, ref } from 'vue'
defineOptions({
    name: 'searchBox'
})
const emits = defineEmits(['submit'])
import { reactive } from 'vue'

const baseForm = reactive({
    name: '',
    region: '',
    time: []
})
const defaultTime2: [Date, Date] = [
    dayjs().subtract(7, 'day').toDate(),
    new Date(),
]
const baseSearchForm = ref(null)

import useTable from '@/stores/table/table'
const useTableStore = useTable()
const onSubmit = () => {
    emits('submit', baseForm)
    useTableStore.changeSearchParam(baseForm)
}
const reset = () => {
    if (!baseSearchForm.value) return
    baseSearchForm.value.resetFields()
}
</script>
<style lang="less" scoped>
.searchBox {
    padding: 12px;
    min-width: 100px;
}

.flex-container {
    display: flex;
    flex-flow: row wrap;
    gap: 12px;

    .form-item,
    .form-action {
        justify-content: flex-start;
        flex: 1 1 100%;
        min-width: 220px;


        @media (min-width: 100px) {
            flex-basis: 100%;
        }

        @media (min-width: 576px) {
            flex-basis: 50%;
        }

        @media (min-width: 768px) {
            flex-basis: 33%;
        }

        @media (min-width: 992px) {
            flex-basis: calc(25% - 10px);
        }
    }

    .form-action {
        .button-group {
            display: flex;
            width: 100%;
            padding-top: 30px;

            @media (max-width: 576px) {
                padding-top: 0px;
                flex-direction: column;
                gap: 10px;

                :deep(.el-button) {
                    width: 100%;
                    display: block;

                    &+.el-button {
                        margin-left: 0;
                    }
                }
            }
        }
    }
}
</style>