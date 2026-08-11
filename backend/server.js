const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const guideRoutes = require("./routes/guideRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/guides", guideRoutes);

app.get("/", (req, res) => {
    res.send("Explore Nepal Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});