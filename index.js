import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
