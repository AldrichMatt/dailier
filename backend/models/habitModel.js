import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllHabits = async () => {
    return await prisma.habits.findMany({
        select : {
            id : true,
            user_id : true,
            title : true,
            description : true,
            frequency : true
        }
    })
}

export const createHabit = async (user_id, title, description, frequency, ) => {
    return await prisma.habits.create({
        data : {
            user_id : user_id,
            title : title,
            description : description,
            frequency : frequency
        },
        select :{
            id : true,
            user_id : true,
            title : true,
            description : true,
            frequency : true
        }
    })
}