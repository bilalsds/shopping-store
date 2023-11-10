<template>
    <div  class="py-4 px-8 text-center grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div class="flex justify-center" v-for="product in products">
            <ProductsCard :products="product" />
        </div>
       
    </div>
    <div class="flex justify-center items-center w-full" v-if="products.length == 0" >
        
        <div class="loader flex justify-center"></div>

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
.loader {
  border: 5px solid #f3f3f3; /* Light grey background */
  border-top: 5px solid red; /* Red color for the loader */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>