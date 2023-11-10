
export const useProductStore = defineStore('product_store',() => {

    let totalCartProducts= useState(() => []) as any;
    let products = useState(() => []) as any;
    const totalCartProductsFilter = computed(() => totalCartProducts.value);
    const totalPrice = computed(() => toRaw(totalCartProducts.value).reduce((count:any,item:any) => count + item.price,0))

  const addToCart = (Item: any) => {

    totalCartProducts.value.push(Item);

   }

  const getAllProducts = async () => {
      const {data} = await useFetch('https://fakestoreapi.com/products');
      products.value = data
   }
   const removeFromCart = (Item:any) => {
    totalCartProducts.value = toRaw(totalCartProducts.value).filter((item:any) => item.id !== Item)

   }

   const filterProducts = (text:any) => {
   
    products.value = toRaw(products.value).filter((item:any) => {
        
        return item.title.toLowerCase().includes(text.toLowerCase())
    })
   }

    const productStore = {
        addToCart,
        totalCartProducts,
        removeFromCart,
        getAllProducts,
        products,
        totalCartProductsFilter,
        totalPrice,
        filterProducts
    }

    return productStore

})