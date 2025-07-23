const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const sessionRoutes = require("./routes/sessionRoutes");

dotenv.config();
const app = express();

// ✅ CORS Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://focusbuzzfrontend.vercel.app'],
  credentials: true,
}));

// Body parser
app.use(express.json());

// ✅ Timer Module Route Only
app.use("/api/session", sessionRoutes);

// ✅ Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
