import { PrismaClient } from "@prisma/client";
import { getTimestamps } from "./abstract.js";

const prisma = new PrismaClient();

export const getAll = async () => {
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

export const getById = async (habit_id) => {
    return await prisma.habits.findUnique({
        select : {
            id : true,
            user_id : true,
            title : true,
            description : true,
            frequency : true
        },
        where : {
            id : habit_id
        }
    })
}

export const create = async (user_id, title, description, frequency) => {
    const created_at = getTimestamps().created_at;
    return await prisma.habits.create({
        data : {
            user_id : user_id,
            title : title,
            description : description,
            frequency : frequency,
            created_at : created_at
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

export const update = async (habit_id, user_id, title, description, frequency) => {
    const updated_at = getTimestamps().updated_at;
    return await prisma.habits.update({
        data : {
            user_id : user_id,
            title : title,
            description : description,
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
            frequency : true
        }
    })
}