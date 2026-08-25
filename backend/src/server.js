import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

dotenv.config();
connectDB();


const PORT = process.env.PORT;

const app = express()

//frontend connection
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res)=>{
    res.send("Hello from Backend")
})

app.listen(PORT, ()=>{
    console.log(`server is running at localhost ${PORT}`);
    
})