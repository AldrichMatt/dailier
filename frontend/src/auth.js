// hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from './middleware/useUserStore';
import { useHabitStore } from './middleware/useHabitStore';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchHabits = async (setHabits) => {
  const habits = await axios.get(`${BASE_URL}/api/v1/habits`,{
            withCredentials : true
          })
          if(habits){
            setHabits(habits.data.habits)
          }
}

export const  useAuthGuard = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser)
  const setHabits = useHabitStore(state => state.setHabits)
  
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/check`, {
          withCredentials: true
        });
        const { user, user_id } = res.data;
        if (!user_id || !user) {
          await axios.get(`${BASE_URL}/api/v1/logout`, {
            withCredentials: true
          });
          navigate("/login", {
            state : {
              warning : "Session expired, Please login again"
            }
          }); 
        }else if(user && user_id){
          setUser(user)
          await fetchHabits(setHabits)
        }
      } catch (error) {
        console.error("Error checking session:", error);
        navigate("/login");
      }
    };

    verifySession();
  }, [navigate]);
};