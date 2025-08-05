import { PrismaClient } from "@prisma/client"
import { getTimestamps } from "./abstract.js"

const prisma = new PrismaClient()

// !! ADD AUTOMATION (node-cron) !!
// ----------------------
// create new habit_checkins record in database
// 
// ----------------------
export const createCheckin = async (habit_id, checkin_datetime) => {
    return await prisma.habit_checkins.create({
        data : {
            habit_id : habit_id,
            checkin_datetime : checkin_datetime,
            completed : false
        },
        select : {
            id : true,
            habit_id : true,
            checkin_datetime : true
        }
    })
}

// ----------------------
// habit checkin record update completed to true
//
// ----------------------
export const checkinComplete = async (habit_id) => {
    return await prisma.habit_checkins.update({
        data : {
            checkin_datetime : getTimestamps().updated_at,
            completed : true
        },
        where : {
            id : habit_id
        },
        select : {
            habit_id : true,
            checkin_datetime : true,
            completed : true
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


export const getByHabitId = async (id) => {
    return await prisma.habit_checkins.findMany({
        select : {
            checkin_datetime : true,
            completed : true
        },
        where : {
            habit_id : id
        }
    })
}

// ----------------------
// return habit_id of a habit with specific id and user_id
// 
// ----------------------
export const getSpecial = async (req) => {
    const habit_id = parseInt(req.params.id)
    return await prisma.habits.findFirst({
        select : {
            id : true
        },
        where : {
            id : habit_id,
            user_id : req.session.user_id
        }
    })
}