import axios from "axios"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { BASE_URL } from "../auth"

export const SessionPing = () => { 
    useEffect(() => {
        const ping = async() => {
        try {
            await axios.get(`${BASE_URL}/ping`, {
                withCredentials : true
            })
        } catch (error) {
            console.log(error);
        }};

        ping();
},[])
    return(
        <Outlet/>
    )
}