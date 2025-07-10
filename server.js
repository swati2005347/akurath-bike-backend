const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const bikeRoutes = require("./routes/bikeRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route for testing
app.get("/", (req, res) => {
  res.send("🚀 Akurath Bike Backend is Live");
});

// API Routes
app.use("/api/bikes", bikeRoutes);

// Port
const PORT = process.env.PORT || 5000;

// DB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
  });
