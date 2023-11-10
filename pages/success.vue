<template>
    <div class="pt-28 px-20">
        <div class="h-96 w-full bg-white rounded-3xl flex flex-col justify-center items-center gap-10">
            <h1 class="font-bold text-3xl px-5">Thanks For Your Shopping !!</h1>
            <button class="px-10 bg-red-400 text-white py-2 rounded-3xl" @click="navigateTo('/')">Continue Shopping</button>

        </div>
    </div>
</template>

<script setup lang="ts">

onBeforeMount(() =>{
    if(!process.server){



        if(sessionStorage.getItem('payment') == 'keep'){
            sessionStorage.removeItem('payment')
        } else {
            navigateTo('/')
        }
    }
})



</script>

<style scoped>

</style>