import { PrismaClient } from "@prisma/client";
import { getTimestamps } from "./abstract";

const prisma = new PrismaClient();

export const createSubscription = async (user_id, endpoint, p256dh, auth) => {
    const created_at = getTimestamps().created_at;

    return await prisma.subscription.create({
        data : {
            user_id : user_id,
            auth : auth,
            endpoint : endpoint,
            p256dh : p256dh,
            created_at : created_at
        },
        select : {
            user_id : true
        }
    })
}