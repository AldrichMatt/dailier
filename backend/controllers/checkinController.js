import { createCheckin } from "../models/checkinModel.js"
import { checkUser } from "./userController.js"

export const checkin = async (req, res) => {
    const user = checkUser(req, res);
    
        const id = parseInt(req.params.id)
        const data = await createCheckin(id);
        res.json(data)
    
}