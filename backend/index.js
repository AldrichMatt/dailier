import express from "express";
import cors from "cors";
import { loginUser, getUsers, newUser, updateUser, deleteUser, checkUser, logout } from "./controllers/userController.js";
import { deleteHabit, getHabits, newHabit, updateHabit } from "./controllers/habitController.js";
import session from "express-session";
import dotenv from 'dotenv';

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
app.get("/habits", getHabits)

app.post("/users/new", newUser)
app.post("/users/update", updateUser)
app.post("/users/delete", deleteUser)

app.post("/habits/new", newHabit)
app.post("/habits/update", updateHabit)
app.post("/habits/delete", deleteHabit)

// REQUESTS FOR USERS
app.post("/api/v1/signup", newUser)
app.post("/api/v1/login", loginUser)
app.get("/api/v1/logout", logout)

app.get("/api/v1/habits", getHabits)
app.post("/api/v1/habits", newHabit)
app.patch("/api/v1/habits/:id/checkin")
// app.get("/api/v1/progress/:habitId")



app.listen(PORT,() => {
    console.log("Server is running "); 
});

