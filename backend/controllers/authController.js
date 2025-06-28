import { userController } from "./userController";

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password);

  // Dummy auth logic (replace with real DB or logic)
  if (email === "admin@example.com" && password === "secret") {
    return res.json({ message: "Login successful!" });
  }

  res.json({ message: "Invalid credentials" });
};