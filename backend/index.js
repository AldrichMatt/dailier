import express from "express";
import cors from "cors";
import { loginUser, getUsers, newUser, updateUser, deleteUser, checkUser, logout } from "./controllers/userController.js";
import { deleteHabit, getHabits, newHabit, updateHabit } from "./controllers/habitController.js";
import session from "express-session";
import dotenv from 'dotenv';
import { checkinReport, checkinProgress } from "./controllers/checkinController.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 menit
    secure: false // set true kalau pakai HTTPS
  }
}));

// REQUESTS FOR ADMIN
app.get("/users", getUsers)
app.get("/users/check", checkUser)
app.get("/habits", getHabits)

app.post("/users/update", updateUser)
app.post("/users/delete", deleteUser)

app.post("/habits/update", updateHabit)
app.post("/habits/delete", deleteHabit)

// REQUESTS FOR USERS
app.post("/api/v1/signup", newUser) //done
app.post("/api/v1/login", loginUser) //done
app.get("/api/v1/logout", logout) //done

app.get("/api/v1/habits", getHabits) //done
app.post("/api/v1/habits", newHabit) //done
app.get("/api/v1/habits/:id/checkin", checkinReport) //done
app.get("/api/v1/progress/:id", checkinProgress) //done



app.listen(PORT,() => {
    console.log("Server is running "); 
});

