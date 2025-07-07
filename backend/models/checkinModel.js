import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createCheckin = async (habit_id) => {
    return await prisma.habit_checkins.create({
        data : {
            habit_id : habit_id
        },
        select : {
            id : true,
            habit_id : true,
            checkin_datetime : true
        }
    })
}

export const getAll = async () => {
    return await prisma.habit_checkins.findMany({
        select : {
            id : true,
            habit_id : true,
            checkin_datetime : true,
            completed : true
        }
    })
}