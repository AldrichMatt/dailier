import { PrismaClient } from "@prisma/client";
import { getTimestamps } from "./abstract.js";

const prisma = new PrismaClient();

export const getAllHabitByUserId = async (req) => {
    return await prisma.habits.findMany({
        select : {
            id : true,
            title : true,
            description : true,
            time : true,
            frequency : true,
            created_at : true,
            updated_at : true
        },
        where : {
            user_id : req.session.user_id
        }
    })
}

export const getHabitById = async (habit_id) => {
    return await prisma.habits.findUnique({
        select : {
            id : true,
            user_id : true,
            title : true,
            description : true,
            time : true,
            frequency : true
        },
        where : {
            id : habit_id
        }
    })
}

export const create = async (user_id, title, description, time, expression, frequency) => {
    const created_at = getTimestamps().created_at;
    return await prisma.habits.create({
        data : {
            user_id : user_id,
            title : title,
            description : description,
            time : time,
            expression : expression,
            frequency : frequency,
            created_at : created_at
        },
        select :{
            id : true,
            user_id : true,
            title : true,
            description : true,
            time : true,
            frequency : true
        }
    })
}

export const update = async (habit_id, title, description, time, frequency) => {
    const updated_at = getTimestamps().updated_at;
    return await prisma.habits.update({
        data : {
            title : title,
            description : description,
            time : time,
            frequency : frequency,
            updated_at : updated_at
        },
        where : {
            id : habit_id
        },
        select :{
            id : true,
            user_id : true,
            title : true,
            description : true,
            time : true,
            frequency : true
        }
    })
}

export const remove = async (habit_id) => {
    return await prisma.habits.delete({
        where : {
            id : habit_id
        }
    })
}
