<template>
    <div class="">   
        <div class="px-10  flex flex-col" v-if="userToken == null">
            <div class="flex justify-center">
                <img class="w-96 h-96" src="https://ae01.alicdn.com/kf/Sa15be314eadd4a9bb186ab4a0cb971b5D/360x360.png_.webp" alt="">

            </div>

            <div class="flex justify-center">
                <span class="text-bold text-lg py-4">No items yet? Continue shopping to explore more.</span>
            </div>

            <div class="flex items-center align-middle flex-col gap-5 pt-5 ">

                <button @click="navigateTo('/login')" class="text-white bg-red-500 w-60 rounded-3xl text-bold text-center py-2">Sign in</button>
                <NuxtLink to="/">
                    <button class="text-black bg-red-200 w-60 rounded-3xl text-bold text-center py-2">
                    
                    Explore Items</button>
                </NuxtLink>
                

            </div>

        </div>


        <div class="px-10 pt-28  flex flex-col gap-8" v-if="userToken !== null">

        

            <div v-for="product in totalCartProductsFilter" class="flex sm:flex-col md:flex-col lg:flex-row justify-between gap-8">
                <div class="image">
                    <img class="rounded-sm w-48 h-48" :src="product.image" alt="" srcset="">
                </div>
                <div class="details flex flex-col gap-5 ">

                    <div class="title">
                        <span>Title : </span> {{ product.title }}
                    </div>

                    <div class="description">
                        <span>Description : </span> {{ product.description }}
                    </div>

                    <div class="price flex flex-row gap-5">
                       <div> <span>Price : </span> $ {{ product.price }}</div>

                        <div class="remove">
                        <button @click="() => removeItem(product.id)" class="text-black bg-red-200 w-36 rounded-3xl text-bold text-center py-2">
                    
                    Remove Item</button>
                    </div>
                    </div>

                    

                </div>
            </div>

            <div class="total flex flex-col items-center py-10 gap-10 bg-white my-8" >
                <div class="totall">
                    <span class="text-bold text-red-500 text-2xl font-medium">Total Price :  </span> $ {{ totalCartProductsFilter.reduce((count:any,item:any) => count + item.price,0) }}
                </div>

              <div class="button">
                <button v-if="!loader" class="text-white bg-red-500 w-60 rounded-3xl text-bold text-center py-2" @click="checkoutHandler">Checkout</button>
                <button v-if="loader" class="text-white loader w-60 rounded-3xl text-bold text-center py-2" >
                
                </button>


              </div>
               
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser() as any;

const store = useProductStore();
const {totalCartProductsFilter,totalPrice} = storeToRefs(store) as any;
const loader = useState(() => false) as any;

const userToken = computed(() => toRaw(user.value));
// 

console.log("toRaw(user.value)toRaw(user.value) :",toRaw(user.value));


const removeItem = (id:Number) => {
    store.removeFromCart(id);
}

const checkoutHandler = async () => {

    const totoalPrice = toRaw(totalCartProductsFilter.value).reduce((count:any,item:any) => count + item.price,0)
    if(totoalPrice == 0){
        alert("Please add product to cart first !!")
        return
    }

    console.log("Total Price",toRaw(totalPrice.value));
    loader.value = true;
    
        const token = localStorage.getItem('sb-oqeugynlmzmzthldadxb-auth-token') as any;
    const {data,pending} = await useFetch('/api/checkout/payment',{
        method:'POST',
        mode:'cors',
        body:{
          items: [
            {
              id: 1,
              quantity: toRaw(totalCartProductsFilter.value).length,
              price: totalPrice,
              name: toRaw(user.value) != null  ? toRaw(user.value).user_metadata.name : "Test Mode"
            }
          ]
        },
        headers:{
            "Content-Type": "application/json",

        }
    }) as any;;

    if(data.value){
        sessionStorage.setItem('payment','keep');
        localStorage.removeItem('product_store');
        window.location  = toRaw(data.value).url;
        loader.value = false;

    }
   
  

}

</script>

<style scoped>
.loader {
  border: 5px solid #f3f3f3; /* Light grey background */
  border-top: 5px solid red; /* Red color for the loader */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* Reduced duration for faster spin */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>