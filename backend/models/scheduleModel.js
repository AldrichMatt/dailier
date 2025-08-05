import cron from 'node-cron'

export const expressionGenerator = (req) => {
    const type = req.body.type
    const expression = ''
    switch (type) {
        case "minute":
            expression = minuteCron(req.body.minute, res)
            break;
        case "hour" : 
            expression = hourCron(req.body.hour, req.body.minute, res)
            break;
        case "day" : 
            expression = dayCron(req.body.day, req.body.hour, req.body.minute, res)
            break;
        case "week" :
            expression = weekCron(req.body.month, req.body.day, req.body.hour, req.body.minute, res)
            break;
        case "month" :
            expression = monthCron(req.body.month, req.body.day, req.body.hour, req.body.minute, res)
            break;
        case "year" :
            expression = yearCron(req.body.day, req.body.hour, req.body.minute, res)
            break;
        default:
            break;
    }    
}

const minuteCron = (minuteInterval) => {
    //every _ minute
    return `
        */${minuteInterval} 
        * 
        * 
        * 
        * 
    `
}

const hourCron = (hourInterval, minute = '0') => {
    //every _ hour at minute _ or every hour at first minute
    return `
        ${minute} 
        */${hourInterval} 
        * 
        * 
        *
    `
}

const dayCron = (dayInterval, hour = '8', minute = '0') => {
    //every _ day at hour _ at minute _ or 8AM everyday
    return `
        ${minute} 
        ${hour} 
        */${dayInterval} 
        * 
        *
    `
}

const weekCron = (monthInterval, dayOfWeek = '0', hour = '8', minute = '0') => {
    //every _ month at _ day at hour _ at minute _ or 8 AM every selected day
    return `
        ${minute} 
        ${hour} 
        *
        */${monthInterval} 
        ${dayOfWeek}
    `
}

const monthCron = (monthInterval, day = '1', hour = '8', minute = '0') => {
    //every _ month at day _ at hour _ at minute _ or 8 AM every first day of the month
    return `
        ${minute} 
        ${hour} 
        ${day} 
        */${monthInterval} 
        *
    `
}

const yearCron = (day = '1', hour = '8', minute = '0') => {
    return `
        ${minute} 
        ${hour} 
        ${day} 
        */12
        *
    `
}