<template>
    <div class="home">
        {{ connter }}
        {{ store.getCounter }}
        <button @click="addFn">+1</button>
        <button @click="subFn">-1</button>
    </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue';
import { useCounterStore } from '@/stores/counter';
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
</script>

<style></style>