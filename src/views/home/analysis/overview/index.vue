<!--
 * @Author: HuangQingyi 297947067@qq.com
 * @Date: 2025-05-22 21:18:58
 * @LastEditors: HuangQingyi 297947067@qq.com
 * @LastEditTime: 2025-05-24 00:07:22
 * @FilePath: \practicevue3-typescript-ele\src\views\home\analysis\overview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="hqy-content">
        <Search @submit="getTableData" />
        <div class="hqy-tablePart">

            <div class="tabdiv">
                <el-table :data="tableData" stripe fit style="width: 100%; height: 100%;">
                    <el-table-column prop="id" label="Date" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="age" label="age" />
                    <el-table-column prop="status" label="状态" />
                    <el-table-column prop="date" label="时间" />
                    <el-table-column prop="avatar" label="图片">
                        <template v-slot="scope">
                            <img style="width: 30px;height: 30px; border-radius: 50%; overflow: hidden;"
                                :src="scope.row.avatar" :alt="scope.row.name">
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationPart">
                <el-pagination v-model:current-page="page.pageNo" v-model:page-size="page.pageSize"
                    :page-sizes="[100, 200, 300, 400]" :size="page.total"
                    layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
// import Search2 from '@/components/search/Search2.vue';
import Search from '@/components/search/Search.vue';
import Api from '@/api/table'
import { reactive, ref } from 'vue';
import type { Itable } from '@/types/login'
import useTable from '@/stores/table/table';
const useTableStore = useTable()
defineOptions({
    name: 'overviewPage'
})
const page = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0
})
const tableData = ref([])

const getTableData = (param) => {
    console.log(param)
    Api.getTable({
        ...param,
        ...page
    }).then((res: Itable) => {
        tableData.value = res.list
        page.total = res.total
    })
}
const handleSizeChange = () => {
    getTableData(useTableStore.searchParam)
}
const handleCurrentChange = () => {
    getTableData(useTableStore.searchParam)
}
</script>

<style lang="less" scoped>
.hqy-tablePart {
    background-color: rgb(225, 225, 225);

    position: relative;

    .tabdiv {
        padding: 10px;
        background-color: red;
        width: 100%;
        height: calc(100% - 50px);
        position: absolute;
        left: 0;
        top: 0;
    }

    .paginationPart {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
    }
}
</style>