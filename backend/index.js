import express from "express";
import cors from "cors";
import { loginUser, getUsers, newUser } from "./controllers/userController.js";
import { getHabits, newHabit } from "./controllers/habitController.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// REQUESTS FOR ADMIN
app.get("/users", getUsers);
app.get("/habits", getHabits);

// REQUESTS FOR USERS
app.post("/users/login", loginUser);
app.post("/users/new", newUser)
app.post("/habits/new", newHabit);




app.listen(PORT,() => {
    console.log("Server is running "); 
});

