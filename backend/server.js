import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import reviewRoutes from "./routes/review.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/reviews", reviewRoutes)

app.listen(5002, () => {
    connectDB();
    console.log("Server started at http://localhost" + PORT);
});