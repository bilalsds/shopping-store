<template>
    <div  class="py-4 px-8 text-center grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div class="flex justify-center" v-for="product in products">
            <ProductsCard :products="product" />
        </div>
       <div class="" v-if="products.length == 0">
        <h1>No Products Found !!</h1>
       </div>
    </div>
</template>

<script setup lang="ts">

const productStore  = useProductStore();
const {products} = storeToRefs(productStore)

onBeforeMount(() => {
    productStore.getAllProducts();

})

</script>

<style scoped>

</style>