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
app.get("/users", getUsers);
app.get("/habits", getHabits);

// REQUESTS FOR USERS
app.post("/users/login", loginUser)
app.get("/users/check", checkUser)
app.get("/logout", logout)

app.post("/users/new", newUser)
app.post("/users/update", updateUser)
app.post("/users/delete", deleteUser)

app.post("/habits/new", newHabit)
app.post("/habits/update", updateHabit)
app.post("/habits/delete", deleteHabit)



app.listen(PORT,() => {
    console.log("Server is running "); 
});

