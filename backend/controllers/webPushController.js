import webpush from 'web-push';
import { createSubscription, findSubscription } from '../models/subscriptionModel.js';
import { checksession } from './authController.js';

export const sendNotification = async (user_id, data) =>{

    const subscription = await findSubscription(user_id);

    if(!subscription){
        return "No Subscription found"
    }

    const pushConfig = {
        endpoint : subscription.endpoint,
        keys : {
            p256dh : subscription.p256dh,
            auth : subscription.auth
        }
    }

    try {
        await webpush.sendNotification(
            pushConfig,
            JSON.stringify(data)
        )
        return console.log("Notification sent succesfully");
    } catch (error) {
        console.log("Error sending notification", error);
    }
}   

export const subscriptionHandshake = async (req, res) => {
    const user_id = checksession(req);
    if(user_id){
        try {
            const { subscription } = req.body;
            const { endpoint, keys } = subscription
            const { p256dh, auth } = keys

            return res.json(
                await createSubscription(user_id, endpoint, p256dh, auth)
            )
        } catch (error) {
            console.log(error)
            return res.json({
                message : error.meta? error.meta : error,
                code : error.code || "SERVER ERROR"
            })
        }
    }else{
        return res.json({
            message : "Please login first"
        })
    }
}