// hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalWarning from './component/ModalWarning';

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/check", {
          withCredentials: true
        });
        const user_id = res.data.user_id;

        if (!user_id) {
          axios.get("http://localhost:5000/api/v1/logout", {
            withCredentials: true
          });
          navigate("/login", {
            state : {
              warning : "Session expired, Please login again"
            }
          });
          
        }
      } catch (error) {
        console.error("Error checking session:", error);
        navigate("/login");
      }
    };

    verifySession();
  }, [navigate]);
};
