<template>
    <div class="ProductCard" @click="() => ItemAdded(products)">
    <div class="bg-white rounded-sm py-4 px-4 flex w-60 h-90 flex-col gap-4 justify-center align-middle cursor-pointer HoverOnCart">

        <div class="flex justify-center">
            <img :src="products.image" class="w-20 h-20" alt="missing" />
        </div>

        <div class="flex justify-center">
            <span>Price</span> : $ {{ products.price }}
        </div>
        <div class="flex justify-center truncate">
            {{ products.title }}
        </div>

       
       
    </div>
    <div class="CartItemButton text-white  px-4 flex justify-center w-60  bg-red-400">
            Add Item to Cart
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps(['products']);

    const {addToCart} = useProductStore();

    const ItemAdded = (item:any) => {
        addToCart(item)
    }
</script>

<style scoped>
.CartItemButton {
    display:none
}
    .HoverOnCart:hover {
        border:2px solid rgb(248 113 113 / 1)
    }
    .ProductCard:hover .CartItemButton {
        display:flex
    }
</style>