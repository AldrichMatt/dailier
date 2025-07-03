import express from "express";
import cors from "cors";
import { loginUser, getUsers, newUser } from "./controllers/userController.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/login", loginUser);
app.post("/register", newUser);
app.get("/users", getUsers);

app.listen(PORT,() => {
    console.log("Server is running "); 
});

