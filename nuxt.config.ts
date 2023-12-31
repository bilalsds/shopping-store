// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:[
    'nuxt-lodash',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  supabase:{
    redirect:false
  },
  runtimeConfig:{
    
    public:{
      stripekey: process.env.STRIPE_KEY,
      successUrl:process.env.SUCCESS_URL,
      failedUrl:process.env.FAILED_URL,
    },
    private:{
      
      stripeSecretKey:process.env.STRIPE_SECRET_KEY,
     
    }
  },
  app:{
    head:{
      script:[{
        src:'https://js.stripe.com/v3/', defer:true
      }]
    }
  },
  css:['~/assets/main.css'],
  pinia:{
    storesDirs:['./stores/**', './custom-folder/stores/**','defineStore'],
  },
})
