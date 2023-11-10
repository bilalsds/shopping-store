<template>
    <div class="shadow-sm flex bg-white align-middle w-full justify-around fixed py-6 lg:px-40 ">
       <h1 class="hover:cursor-pointer" @click="navigateTo('/')">
        <img src="~/assets/AliExpress_Russia.svg" class="w-9 h-9" alt="">
       </h1>
      <div>
            <input type="text" class="border-0 rounded-lg  ring-white md:w-96 bg-gray-200 w-full focus:outline-none px-6 py-2" placeholder="Search Here...">
        </div>
        <div class=" self-center flex gap-8">
                <IconsCart @click="navigateTo('/ShoppingCart')" class="text-black hover:text-red-500 cursor-pointer w-8 h-8" />
            <span class="relative right-10 bg-red-500 text-white w-6 flex justify-center align-middle rounded-full h-6 bottom-1">{{ (totalCartProductsFilter).length }}</span>

            
            <IconsUser @click="navigateTo('/login')" class="text-black hover:text-red-500 cursor-pointer w-8 h-8" />
        </div>
        <div class=" self-center">
         
        </div>
        
    </div>
</template>

<script setup lang="ts">


const store = useProductStore();
const {totalCartProductsFilter} = storeToRefs(store)

</script>

<style scoped>

</style>