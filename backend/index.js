import express from "express";
import cors from "cors";
import { loginUser, getUsers, newUser, updateUser, deleteUser, checkUser, logout } from "./controllers/userController.js";
import { deleteHabit, getHabits, newHabit, updateHabit } from "./controllers/habitController.js";
import session from "express-session";
import dotenv from 'dotenv';
import { checkinReport, checkinProgress, checkinHandler } from "./controllers/checkinController.js";
import cookieParser from "cookie-parser";
import { refreshsession } from "./controllers/authController.js";
import { checkinWebSocket } from "./middleware/checkinWebSocket.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : 'http://localhost:3000',
  credentials : true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 menit
    secure: false // set true kalau pakai HTTPS
  }
}));

// REQUESTS FOR ADMIN
app.get("/users", getUsers)
app.get("/users/check", checkUser)
app.get("/ping", refreshsession)
app.get("/habits", getHabits)

app.post("/users/update", updateUser)
app.post("/users/delete", deleteUser)

app.post("/habits/update", updateHabit)

// REQUESTS FOR USERS
app.post("/api/v1/signup", newUser) //done
app.post("/api/v1/login", loginUser) //done
app.get("/api/v1/logout", logout) //done

app.get("/api/v1/habits", getHabits) //done
app.post("/api/v1/habits", newHabit) //done
app.delete("/api/v1/habits", deleteHabit) //done
app.put("/api/v1/habits", updateHabit) //done
app.get("/api/v1/habits/:id/checkin", checkinReport) //done
app.get("/api/v1/progress/:id", checkinProgress) //done



const server = app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`); 
    // checkinHandler()
    // cron.schedule(`0 8 */1 * *`,
    // checkinHandler,
    //   {
    //     noOverlap : true,
    //   }
    // )
    
});

checkinWebSocket(server)