import Stripe from 'stripe';

const Secret_Key = useRuntimeConfig().private.stripeSecretKey;
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
                currency: 'inr',
                product_data: {
                  name: item.name,
                },
                unit_amount: (item.price)*100, // Assuming 'amount' is the price in the smallest currency unit (e.g., paise for INR)
              },
              quantity: item.quantity, // Assuming there is a 'quantity' field in the item object
            };
          }),
          // Add other necessary Checkout Session parameters like success and cancel URLs
          success_url: useRuntimeConfig().public.successUrl, // Replace with your success URL
          cancel_url: useRuntimeConfig().public.failedUrl, // Replace with your cancel URL
        });
    
        return {url:session.url};
      } catch (error) {
        console.error('Error creating checkout session:', error);
       return { error: error.message };
      }
  
  
})
// const checkout = async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: req.body.items.map(item => {
//           return {
//             price_data: {
//               currency: 'inr',
//               product_data: {
//                 name: item.name,
//               },
//               unit_amount: (item.price)*100, // Assuming 'amount' is the price in the smallest currency unit (e.g., paise for INR)
//             },
//             quantity: item.quantity, // Assuming there is a 'quantity' field in the item object
//           };
//         }),
//         // Add other necessary Checkout Session parameters like success and cancel URLs
//         success_url: 'http://127.0.0.1:5173/success', // Replace with your success URL
//         cancel_url: 'https://example.com/cancel', // Replace with your cancel URL
//       });
  
//       res.json({url:session.url});
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       res.status(500).json({ error: error.message });
//     }

// }
