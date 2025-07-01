import express from "express";
import cors from "cors";
import { loginUser } from "./controllers/userController.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/login", loginUser);

app.listen(PORT,() => {
    console.log("Server is running "); 
});

