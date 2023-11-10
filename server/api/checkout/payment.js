import Stripe from 'stripe';

const Secret_Key = 'sk_test_51OAnjUCWjG2lF0aUU7hMgDaeN969SsVdqgJhBIzuqeSmLrvs6CJ4Mfz9U6WhQgFHw1v8TeWTcfi7ZgahFdB4jRZg00dO0RDak8';
const stripe = Stripe(Secret_Key);


export default defineEventHandler(async(event) => {

    const body = await readBody(event);
    
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: body.items.map(item => {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                },
                unit_amount: Math.round(item.price * 100), 
              },
              quantity: item.quantity, 
            };
          }),
          success_url: 'https://shopping-store-lake.vercel.app/success',
          cancel_url: 'https://shopping-store-lake.vercel.app/cancel',
        });
    
        return {url:session.url};
      } catch (error) {
       return { error: error.message };
      }
  
  
})

