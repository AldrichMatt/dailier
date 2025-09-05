import webpush from 'web-push';
import { createSubscription } from '../models/subscriptionModel';
import { checksession } from './authController';

export const sendNotification = (subscription, data) =>{
    webpush.sendNotification(subscription, JSON.stringify(data))
        .catch(err => console.log("Push error : ", err))
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
                code : error.code
            })
        }
    }else{
        return res.json({
            message : "Please login first"
        })
    }
}