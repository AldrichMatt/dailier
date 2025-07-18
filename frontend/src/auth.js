// hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from './middleware/useUserStore';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/check`, {
          withCredentials: true
        });
        const { user, user_id } = res.data;
        if (!user_id) {
          await axios.get("http://localhost:5000/api/v1/logout", {
            withCredentials: true
          });
          navigate("/login", {
            state : {
              warning : "Session expired, Please login again"
            }
          }); 
        }else if(user && user_id){
          setUser(user)
        }
      } catch (error) {
        console.error("Error checking session:", error);
        navigate("/login");
      }
    };

    verifySession();
  }, [navigate]);
};
