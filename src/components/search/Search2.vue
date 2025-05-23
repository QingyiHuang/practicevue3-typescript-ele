<template>
    <div class="searchBox">
        <el-form :inline="true" :model="baseForm" label-width="120" label-position="top">
            <el-row :gutter="16">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <el-form-item label="名称">
                        <el-input v-model="baseForm.name" placeholder="请输入名称" clearable />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <el-form-item label="区域">
                        <el-select v-model="baseForm.region" placeholder="请选择区域" clearable style="width: 100%;">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <el-form-item label="Activity time">
                        <el-date-picker v-model="baseForm.time" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" :default-time="defaultTime2" style="width: 100%;" />
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
                    <div class="form-action">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button> @click="onSubmit"重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import dayjs from 'dayjs'
import { toRaw } from 'vue'
defineOptions({
    name: 'searchBox'
})
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
console.log(defaultTime2)
const onSubmit = () => {
    console.log(toRaw(baseForm))
}
</script>
<style lang="less" scoped>
.searchBox {
    padding: 12px;
}

.form-action {
    display: flex;
    gap: 12px;
    justify-content: flex-start;
    align-self: center;
    padding-top: 30px;
    /* 对齐表单项 */
}

@media (max-width: 768px) {
    .form-action {
        justify-content: center;
        padding-top: 0;
    }
}

:deep(.el-form-item) {
    margin-bottom: 16px;

    &__label {
        font-weight: 500;
    }
}

:deep(.el-input) {
    min-width: 120px;
}
</style>