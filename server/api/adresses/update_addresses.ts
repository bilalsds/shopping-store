import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    const address = await prisma.orders.update({
        where:{
            id:Number(body.id)
        },
            data:{
                userId:body.userId,
      name :body.name,
      address :body.address,
      zipcode :body.zipcode,
      city :body.city,
      country :body.country,
      createdAt :body.createdAt,
            }
            
    });

   

    return address
})