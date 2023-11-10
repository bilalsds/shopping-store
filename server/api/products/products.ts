import axios from "axios"

export default defineEventHandler(async() => {

    const {data } = await axios.get('https://fakestoreapi.com/products');
   
   return {
    data:data,
   }
  
  
})
