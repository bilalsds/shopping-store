import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    const order = await prisma.orders.create({
        data:{
            userId:body.userId,
            name :body.name,

            address :body.address,
            zipcode :body.zipcode,
            city :body.city,
            country:body.country,
            createdAt :body.createdAt,
            orderItems :body.orderItems,

        }
    });

    body.products.forEach(async(item:any) => {

        await prisma.orderItem.create({
            data:{
                orderId:order.id,
                productId:Number(item.id),
                orderNumber:order.userId,
            }
        })

    })

    return order
})