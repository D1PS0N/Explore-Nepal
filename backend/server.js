const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const guideRoutes = require("./routes/guideRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cinematicRoutes = require("./routes/cinematicRoutes");
const productionInquiryRoutes = require("./routes/productionInquiryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));
app.use("/admin", express.static(path.join(__dirname, "../admin")));

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/login.html"));
});

app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/cinematic", cinematicRoutes);
app.use("/api/production-inquiries", productionInquiryRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});