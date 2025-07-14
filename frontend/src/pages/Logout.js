import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await axios.get('http://localhost:5000/api/v1/logout')
            navigate('/login');
        }
        performLogout()
    }, [navigate])

    return null;
}