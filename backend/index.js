
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const router = require("./routes/router");
const analyticsRouter = require("./routes/Ananlytics");

dotenv.config();

// CORS SETTINGS
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// BODY PARSER
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE
connectDB();

// ROUTES
app.use("/api", analyticsRouter);
app.use("/api", router);

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("The backend is running");
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
